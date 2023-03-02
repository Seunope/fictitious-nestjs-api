import { Injectable } from '@nestjs/common';
import { AuthDto } from '../dto';

@Injectable()
export class AuthService {
  async signup(dto: AuthDto) {
    // generate the password hash
    // const hash = await argon.hash(dto.password);
    // // save the new user in the db
    // try {
    //   const user = await this.prisma.user.create({
    //     data: {
    //       email: dto.email,
    //       hash,
    //     },
    //   });
    //   return this.signToken(user.id, user.email);
    // } catch (error) {
    //   if (
    //     error instanceof
    //     PrismaClientKnownRequestError
    //   ) {
    //     if (error.code === 'P2002') {
    //       throw new ForbiddenException(
    //         'Credentials taken',
    //       );
    //     }
    //   }
    //   throw error;
    // }
  }

  async login(dto: AuthDto) {
    // generate the password hash
    // const hash = await argon.hash(dto.password);
    // // save the new user in the db
    // try {
    //   const user = await this.prisma.user.create({
    //     data: {
    //       email: dto.email,
    //       hash,
    //     },
    //   });
    //   return this.signToken(user.id, user.email);
    // } catch (error) {
    //   if (
    //     error instanceof
    //     PrismaClientKnownRequestError
    //   ) {
    //     if (error.code === 'P2002') {
    //       throw new ForbiddenException(
    //         'Credentials taken',
    //       );
    //     }
    //   }
    //   throw error;
    // }
  }
}
