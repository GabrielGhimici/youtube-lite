import { GridViewVideoElement } from './grid-view-video/grid-view-video.element';
import { RecommendedVideoElement } from './recommended-video/recommended-video.element';
import { SearchedVideoElement } from './searched-video/searched-video.element';

export enum VideoType {
  GridView = 'grid-view',
  Recommended = 'recommended',
  Searched = 'searched'
}

export class PreviewVideoFactory {
  static createVideo(videoType: VideoType, data: any) {
    switch (videoType) {
      case VideoType.GridView:
        return new GridViewVideoElement(data);
      case VideoType.Recommended:
        return new RecommendedVideoElement(data);
      case VideoType.Searched:
        return new SearchedVideoElement(data);
      default:
        return null;
    }
  }
}
