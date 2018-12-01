import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { User } from '../../api/model/user.model';

@Service()
export class AuthorizationService{

  constructor(
    private conManager: ConnectionManager
  ) {}

  checkUser(email: string, password: string): Promise<User> {
    return null;
  }
}
