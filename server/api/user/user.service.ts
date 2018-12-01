import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { User } from '../model/user.model';

@Service()
export class UserService {
  private readonly allIncludedValues = ['videos', 'comments'];

  constructor(
    private conManager: ConnectionManager
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

}
