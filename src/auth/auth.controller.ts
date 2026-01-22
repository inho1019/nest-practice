import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
    return res.send({ message: 'Login successful', user: req.user });
  }

  @Post('/logout')
  async logout(@Response() res) {
    res.clearCookie('login');
    return res.send({ message: 'Logout successful' });
  }

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('/test-guard')
  testGuard() {
    return { message: 'Guard is working' };
  }
}
