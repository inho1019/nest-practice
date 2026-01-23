import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '@/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.email); // 세션에 저장할 정보
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    if (user) {
      delete user.password;
      done(null, user);
    } else {
      done(new Error('User not found'), null);
    }
  }
}
