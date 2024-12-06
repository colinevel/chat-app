import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        accessToken: string;
    }>;
    signup(pseudo: string, email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
