import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user._id, pseudo: user.pseudo };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async signup(
    pseudo: string,
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.createUser({
      pseudo,
      email,
      password,
    });
    return this.login(user);
  }
}
