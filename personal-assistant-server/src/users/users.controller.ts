import { Body, Controller, Delete, Get, Param, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAllUsers() {
    return this.usersService.findAllUsers();
  };

   @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  async findUserById(@Param('userId') userId: string) {
    return this.usersService.findUserById(userId);
  }

  @Put(':userId/edit-account')
  @UseGuards(AuthGuard('jwt'))
  async editUser(@Param('userId') userId: string, @Body() updateData: Partial<any>, @Req() req) {
    if(req.user.id !== userId && req.user.role !== 'ADMIN') throw new UnauthorizedException('You can only edit your own account');
    return this.usersService.editUser(userId, updateData);
  }

  @Delete(':userId/delete-account')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('userId') userId: string, @Req() req) {
    if(req.user.id !== userId && req.user.role !== 'ADMIN') throw new UnauthorizedException('You can only delete your own account');
    return this.usersService.deleteUser(userId);
  }
}
