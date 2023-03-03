import { AuthDto } from '../dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  //   @HttpCode(HttpStatus.OK)
  //   @Post('signin')
  //   login(@Body() dto: AuthDto) {
  //     return this.authService.login(dto);
  //   }
}
