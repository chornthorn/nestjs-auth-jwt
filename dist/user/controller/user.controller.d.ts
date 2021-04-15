import { Observable } from 'rxjs';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUser(): Observable<IUser[]>;
    create(createUserDto: CreateUserDto): Observable<IUser>;
    login(loginUserDto: LoginUserDto): Observable<any>;
    helloWorld(): string;
}
