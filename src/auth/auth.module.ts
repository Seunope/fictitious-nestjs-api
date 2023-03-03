import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/schema/user.schema';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'adafakjgajdvasjdvagskdasdgad', // process.env.JWT_SECRET, // new ConfigService().get('JWT_SECRET'), // process.env.JWT_SECRET,
      signOptions: { expiresIn: '120m' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
