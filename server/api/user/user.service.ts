import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { User } from '../model/user.model';
import { AuthorizationService } from '../../authorization/authorization.service';

@Service()
export class UserService {
  private readonly allIncludedValues = ['videos', 'comments'];

  constructor(
    private conManager: ConnectionManager,
    private authorization: AuthorizationService
  ) {}

  getAllUsers(queryParams: any): Promise<Array<User>> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludedValues.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.manager.getRepository(User).find({relations: relationsArr});
      });
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(User)
    })
  }

  getCurrentUser(userId: any, queryParams: any): Promise<User> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludedValues.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.manager.getRepository(User).findOne(userId, {relations: relationsArr});
      });
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(User, {id: userId});
    })
  }

  saveUser(user: User) {
    return this.conManager.connection.then((connection) => {
      const saltedPassword = this.authorization.sha512(user.password, this.authorization.getSalt());
      user.password = saltedPassword.passwordHash;
      user.salt = saltedPassword.salt;
      return new Promise((resolve, reject) => {
        connection.manager.save(user).then((user) => {
          delete user.password;
          delete user.salt;
          resolve(user);
        }).catch(err => {
          reject(err);
        })
      })
    })
  }
}
