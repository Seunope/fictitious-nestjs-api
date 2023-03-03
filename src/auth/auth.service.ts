import {
  Injectable,
  NotAcceptableException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto } from '../dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: AuthDto): Promise<any> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      const payload = { email: dto.email, sub: user._id };
      const token = this.jwtService.sign(payload);
      return {
        token,
        user,
      };
    }

    throw new ForbiddenException('Credentials wrong');
  }
}
