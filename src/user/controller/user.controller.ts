import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUser(): Observable<IUser[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<any> {
    return this.userService.login(loginUserDto).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000,
        };
      }),
    );
  }
}
