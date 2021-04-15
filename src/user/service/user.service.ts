import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  findAll(): Observable<IUser[]> {
    return from(this.userRepository.find());
  }
  create(createUserDto: CreateUserDto): Observable<IUser> {
    return this.mailExists(createUserDto.email).pipe(
      switchMap((emailExists: boolean) => {
        if (!emailExists) {
          return this.authService.hashPassword(createUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              createUserDto.password = passwordHash;
              return from(this.userRepository.save(createUserDto)).pipe(
                map((saveUser: IUser) => {
                  const { password, ...user } = saveUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: IUser) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: IUser) => {
                    return this.authService.generateJwt(user);
                  }),
                );
              } else {
                throw new HttpException(
                  'Login was not successful',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  findOne(id: number): Observable<IUser> {
    return from(this.userRepository.findOne({ id }));
  }

  private findUserByEmail(email: string): Observable<IUser> {
    return from(
      this.userRepository.findOne(
        { email },
        { select: ['id', 'email', 'name', 'password'] },
      ),
    );
  }

  private validatePassword(
    password: string,
    storePasswordHash: string,
  ): Observable<boolean> {
    return this.authService.comparePassword(password, storePasswordHash);
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: IUser) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
