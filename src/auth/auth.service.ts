import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
    userDto.password = encryptedPassword;
    try {
      const user = await this.userService.createUser(userDto);

      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      return null;
    }
    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }
}
