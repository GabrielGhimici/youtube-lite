import { UserManagementEpics } from './user-management/user-management.epics';

export class RootEpics {
  static createEpics() {
    return [
      ...UserManagementEpics.createEpics()
    ]
  }
}
