import { Controller, Get, QueryParams } from '@tsed/common';
import { User } from '../model/user.model';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Get('')
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<User>> {
    return this.userService.getAllUsers(query);
  }
}
