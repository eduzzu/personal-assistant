import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/DTOs/createUserDTO';
import {
  RequestPasswordResetDto,
  ResetPasswordDto,
} from 'src/DTOs/requestPasswordResetDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('birthDate') birthDate: Date,
  ) {
    const createUserDto = new CreateUserDto();
    createUserDto.email = email;
    createUserDto.password = password;
    createUserDto.firstName = firstName;
    createUserDto.lastName = lastName;
    createUserDto.birthDate = birthDate;

    return this.authService.register(createUserDto);
  }

  @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ){
        const user = await this.authService.validateUserForLogin(email, password)
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // Map user to Omit<IUser, "password">
        const mappedUser = {
            id: user.id ?? user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            role: user.role,
        };
        return this.authService.login(mappedUser);
    }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
