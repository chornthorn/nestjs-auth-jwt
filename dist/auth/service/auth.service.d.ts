import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IUser } from 'src/user/models/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: IUser): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(password: string, storedPassword: string): Observable<any>;
}
