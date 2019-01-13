import { BodyParams, Controller, Get, Post, Request, Required, Response, UseBefore } from '@tsed/common';
import { Unauthorized } from 'ts-httpexceptions';
import { AuthorizationService } from './authorization.service';

const crypto = require('crypto');

@Controller('')
export class AuthenticationController {

  constructor(
    private authorizationService: AuthorizationService
  ) {}

  @Get('/token_info')
  getTokenInfo(
    @Request() request,
    @Response() response,
  ) {
    if (request.headers &&
        request.headers.authorization &&
        request.session &&
        request.session.token &&
        request.session.token === request.headers.authorization) {
      response.status(200).send({OK: true});
    } else {
      response.status(200).send({OK: false});
    }
  }

  @Post('/login')
  doLogin(
    @Request() request,
    @Response() response,
    @Required() @BodyParams('email') email: string,
    @Required() @BodyParams('password') password: string,
  ) {
    return this.authorizationService.checkUser(email, password).then((user) => {
      if (user) {
        request.session.user = user;
        request.session.token = crypto.randomBytes(20).toString('hex');
        response.cookie('YTLite', request.session.token, {
          expires: new Date(Number(new Date())+24*60*60*1000),
          httpOnly: false
        });
        return {
          OK: true
        };
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
    request.session.destroy((err) => {
      if (err) {
        console.error('session destroy', err);
        response.status(500).send();
      } else {
        response.status(200).send({OK: true});
      }
    });
  }
}
