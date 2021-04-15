import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    findAll(): Observable<IUser[]>;
    create(createUserDto: CreateUserDto): Observable<IUser>;
    login(loginUserDto: LoginUserDto): Observable<string>;
    findOne(id: number): Observable<IUser>;
    private findUserByEmail;
    private validatePassword;
    private mailExists;
}
