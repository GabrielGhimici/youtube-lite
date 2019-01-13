import { Service } from '@tsed/common';
import { ConnectionManager } from '../connection-manager';
import { User } from '../api/model/user.model';

const crypto = require('crypto');

@Service()
export class AuthorizationService{

  constructor(
    private conManager: ConnectionManager
  ) {}

  getSalt(length: number = 5) {
    return crypto.randomBytes(Math.ceil(length/2))
      .toString('hex')
      .slice(0,length)
      .toUpperCase();
  }

  sha512(password, salt){
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value
    };
  };

  checkUser(email: string, password: string): Promise<User> {
    return this.conManager.connection.then((connection) => {
      const userReqs = [
        connection.manager.findOne(User, {email: email}),
        connection.getRepository(User)
          .createQueryBuilder('user')
          .select(['user.password', 'user.salt'])
          .where(`email = :email`)
          .setParameters({email: email})
          .getOne()
      ];
      return Promise.all(userReqs).then(([user, necessaryInfo]) => {
        if (user && necessaryInfo) {
          const hashedPassword = this.sha512(password, necessaryInfo.salt);
          if (hashedPassword.passwordHash === necessaryInfo.password) {
            return user;
          }
        }
        return null;
      })
    });
  }
}
