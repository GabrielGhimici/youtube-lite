import { BodyParams, Controller, Post, Request, Required, Response, UseBefore } from '@tsed/common';
import { Unauthorized } from 'ts-httpexceptions';
import { AuthorizationService } from './authorization.service';

const crypto = require('crypto');

@Controller('/auth')
export class AuthenticationController {

  constructor(
    private authorizationService: AuthorizationService
  ) {}


  @Post('/login')
  doLogin(
    @Request() request,
    @Response() response,
    @Required() @BodyParams('username') username: string,
    @Required() @BodyParams('password') password: string,
  ) {
    return this.authorizationService.checkUser(username, password).then((user) => {
      if (user) {
        request.session.user = user;
        request.session.token = crypto.randomBytes(20).toString('hex');
        response.cookie('CSToken', request.session.token, request.session.cookie);
        return 'OK';
      } else {
        throw new Unauthorized('Unauthorized');
      }
    })
  }
  @Post('/logout')
  doLogout(
    @Request() request,
    @Response() response,
  ) {
    return 'OK';
  }
}
