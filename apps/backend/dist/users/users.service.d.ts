import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
}
