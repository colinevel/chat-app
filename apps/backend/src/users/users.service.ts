// src/users/users.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, pseudo } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      email,
      pseudo,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Find all users
  async findAll(): Promise<User[]> {
    const usersDB = await this.userModel.find().exec();

    return usersDB;
  }

  // Find one user by id
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
