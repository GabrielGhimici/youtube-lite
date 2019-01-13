import { UserEpics } from './user/user.epics';
import { AuthorizationEpics } from './authorization/authorization.epics';

export class UserManagementEpics {
  static createEpics() {
    return [
      new UserEpics().createEpics(),
      new AuthorizationEpics().createEpics()
    ];
  }
}
