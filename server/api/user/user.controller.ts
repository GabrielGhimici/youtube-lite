import { BodyParams, Controller, Get, PathParams, Post, QueryParams, Request, Required, Response } from '@tsed/common';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { Unauthorized } from 'ts-httpexceptions';

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

  @Post('')
  saveUser(
    @Request() request,
    @Response() response,
    @Required() @BodyParams() user: User
  ){
    return this.userService.saveUser(user);
  }

  @Get('/me')
  getCurrentUser(
    @Request() request,
    @Response() response,
  ): Promise<User> {
    if (request.session && request.session.user) {
      return this.userService.getCurrentUser(request.session.user.id, {});
    } else {
      throw new Unauthorized('Unauthorized');
    }
  }

  @Get('/:id(\\d+)')
  getUser(
    @Request() request,
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<User> {
    return this.userService.getCurrentUser(id, query);
  }

}
