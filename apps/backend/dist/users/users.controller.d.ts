import { CreateUserDto } from './dto/users.create-users.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    getUser(req: any): Promise<User>;
}
