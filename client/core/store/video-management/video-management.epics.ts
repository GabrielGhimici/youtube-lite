import { VideoListEpics } from './video-list/video-list.epics';
import { ListType } from './video-management.reducer';
import { CurrentVideoEpics } from './current-video/current-video.epics';

export class VideoManagementEpics {
  static createEpics() {
    return [
      new VideoListEpics().createEpic(ListType.Main),
      new VideoListEpics().createEpic(ListType.Filtered),
      new VideoListEpics().createEpic(ListType.Recommended),
      new CurrentVideoEpics().createEpic()
    ]
  }
}
