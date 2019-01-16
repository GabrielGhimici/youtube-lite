import { Component } from '../../../../core/generic-components/component';
import { PreviewVideoFactory, VideoType } from '../../preview-video/preview-video-factory';
import './recommended-video-section.styles.scss'
import { store } from '../../../../index';
import { Video } from '../../../../core/store/video-management/video';
import { VideoListActions } from '../../../../core/store/video-management/video-list/video-list.actions';
import { ListType } from '../../../../core/store/video-management/video-management.reducer';

export class RecommendedVideoSectionComponent extends Component {
  constructor() {
    super();
    store.subscribe(() => {
      const mainVideos = store.getState().videoManagement.recommendedVideos.items;
      this.children = [];
      mainVideos.forEach((video: Video) => {
        this.children.push(PreviewVideoFactory.createVideo(VideoType.Recommended, video));
      });
      this.children.forEach((item) => {
        item.setParent(this);
      });
      if (document.body.contains(this.componentHtml) && this.componentHtml.parentNode) {
        this.componentHtml.parentNode.removeChild(this.componentHtml);
        this.render();
      }
    });
  }
  onInit(): void {
    super.onInit();
    store.dispatch(VideoListActions.loadData(ListType.Recommended));
  }
  render(): void {
    this.componentHtml = document.createElement('div');
    this.componentHtml.className = 'recommended-video-section-container';
    this.componentHtml.setAttribute('id', 'recommendedVideoSection');
    super.render('recommendedVideosPlaceholder');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
