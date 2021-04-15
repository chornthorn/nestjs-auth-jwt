import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { from, Observable } from 'rxjs';
import { IUser } from 'src/user/models/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: IUser): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePassword(password: string, storedPassword: string): Observable<any> {
    return from(bcrypt.compare(password, storedPassword));
  }
}
