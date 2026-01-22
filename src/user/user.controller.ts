import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    return await this.userService.getUser(email);
  }

  @Get('/getUserList')
  async getUserList() {
    return await this.userService.getUserList();
  }

  @Put('/update/:email')
  async updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.deleteUser(email);
  }
}
