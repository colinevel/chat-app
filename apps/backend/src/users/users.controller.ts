// src/users/users.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post('create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = {
      _id: '1234',
      pseudo: 'coline',
      email: 'test@example.com',
      password: 'xxxxx',
    };
    return await this.usersService.create(user);
  }

  // Get all users
  @Get('all')
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    console.log('users', users);
    return users;
  }

  // Get user by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }
}
