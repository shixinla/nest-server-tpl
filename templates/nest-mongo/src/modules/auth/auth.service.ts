import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/filters/http-exception.filter';
import { BUSINESS_CODE } from '@/enums/response.enums';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    throw new UserException(BUSINESS_CODE.USER_NOT_MATCH);
  }

  async login(user: { username: string; userId: string }) {
    const payload = { user: user.username, sub: user.userId };

    return { access_token: this.jwtService.sign(payload) };
  }
}
