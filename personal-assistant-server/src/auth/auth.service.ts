import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/DTOs/createUserDTO';
import nodemailer from "nodemailer";
import { LoginDTO } from 'src/DTOs/LoginDTO';
import { IUser } from 'src/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

async validateUserForLogin(email: string, password: string) {
  const user = await this.userModel.findOne({ email }).select('+password').exec();
  if (!user) return null;

  if (!user.password) throw new Error('Password not set for this user');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const { password: _pass, ...result } = user.toObject();
  return result;
}

  async login(user: Omit<IUser, 'password'>) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }


  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, birthDate } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate      
    });


    return createdUser.save();
  }

  private async sendResetEmail(email: string, token: string) {
    const capi = process.env.C_API;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Personal-Assistant" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your account password',
      text: `To reset your account password, you need to access the next link: ${capi}/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async requestPasswordReset(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
    try {
      await this.sendResetEmail(email, token);
    } catch (err) {
      throw new InternalServerErrorException(`Failed to send email: ${err}`);
    }

    return { message: 'The reset password email was sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch (err) {
      throw new InternalServerErrorException(`Invalid or expired token: ${err}`);
    }

    const user = await this.userModel.findById(decoded.id).exec();
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: 'Password reset successfully!' };
  }
}
