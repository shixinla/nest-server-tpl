import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '@/decorators/custom-decorators';

@ApiTags('鉴权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user);
  }
}
