import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditUserDto } from 'src/DTOs/editUserDTO';
import { UserResponseDto } from 'src/DTOs/userResponseDTO';
import { IUser } from 'src/interfaces/users.interface';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAllUsers(): Promise<UserResponseDto[]> {
    try{
        const users = await this.userModel.find().exec();
        return users.map((user) => ({
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        role: user.role,
    }));
    } catch(error) {
        throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(userId: string): Promise<UserResponseDto> {
    try{
        const user = await this.userModel.findById(userId).exec();
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            role: user.role,
        };
    } catch(error){
        throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUser(userId: string, updateData: Partial<IUser>): Promise<EditUserDto> {
    try{
        const user = await this.userModel.findById(userId).exec();
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userId,
            {
            firstName: updateData.firstName ?? user.firstName,
            lastName: updateData.lastName ?? user.lastName,
            birthDate: updateData.birthDate ?? user.birthDate,
            role: updateData.role ?? user.role,
            },
            { new: true }
        ).exec();
        if (!updatedUser) throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
        return {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            birthDate: updatedUser.birthDate,
            role: updatedUser.role,
        };
    } catch(error){
        throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async deleteUser(userId: string): Promise<void> {
    try{
        const result = await this.userModel.findByIdAndDelete(userId).exec();
        if (!result) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return;
    } catch(error) {
        throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
