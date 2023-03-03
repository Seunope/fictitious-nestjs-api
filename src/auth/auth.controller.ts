import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(AuthGuard('local'))
  @Post('login')
  signup(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  //   @HttpCode(HttpStatus.OK)
  //   @Post('signin')
  //   login(@Body() dto: AuthDto) {
  //     return this.authService.login(dto);
  //   }
}
