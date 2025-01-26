// src/users/users.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post('create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  // Get all users
  @Get('all')
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  // Get user by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('getUser')
  async getUser(@Request() req) {
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
