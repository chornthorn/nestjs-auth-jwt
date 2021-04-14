import { Body, Controller, Get, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUser(): Observable<IUser[]> {
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() user: IUser): Observable<IUser> {
    return this.userService.addUser(user);
  }
}
