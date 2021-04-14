import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePassword(password: string, storedPassword: string): Observable<any> {
    return from(bcrypt.compare(password, storedPassword));
  }
}
