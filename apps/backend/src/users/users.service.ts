// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('yoloooo');
    const createdUser = new this.userModel(createUserDto);
    console.log('createUser', createdUser);

    return createdUser.save();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    const usersDB = await this.userModel.find().exec();
    console.log('db users', usersDB);

    return usersDB;
  }

  // Find one user by id
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Other CRUD methods as needed...
}
