import { UserManagementEpics } from './user-management/user-management.epics';
import { VideoManagementEpics } from './video-management/video-management.epics';

export class RootEpics {
  static createEpics() {
    return [
      ...UserManagementEpics.createEpics(),
      ...VideoManagementEpics.createEpics()
    ]
  }
}
