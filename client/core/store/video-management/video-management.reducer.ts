import { combineReducers } from 'redux';
import { videoListReducer } from './video-list/video-list.reducer';
import { currentVideoReducer } from './current-video/current-video.reducer';

export enum ListType {
  Main = 'main-videos',
  Filtered = 'filtered-videos',
  Recommended = 'recommended-videos',
}

export const videoManagementReducer = combineReducers({
  mainVideos: videoListReducer(ListType.Main),
  filteredVideos: videoListReducer(ListType.Filtered),
  recommendedVideos: videoListReducer(ListType.Recommended),
  currentVideo: currentVideoReducer
});
