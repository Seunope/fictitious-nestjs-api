import {
  Get,
  Post,
  Put,
  Body,
  Res,
  Param,
  Req,
  Delete,
  HttpStatus,
  Controller,
  NotAcceptableException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByEmail(createUserDto.email);

      if (user) {
        throw new NotAcceptableException('User already exist');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
      createUserDto.password = hashedPassword;

      const newUser = await this.userService.createUser(createUserDto);

      delete newUser.password;
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err.message || 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() request) {
    const userId = request.user.userId;

    return this.userService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        data: userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.userService.getUser(userId);
      //   delete existingUser.password;

      //   console.log('sdsdsdsd', existingUser.password);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
