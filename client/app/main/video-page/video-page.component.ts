import { Component } from '../../../core/generic-components/component';
import { VideoPlayerElement } from './video-player/video-player.element';
import { MetadataSectionElement } from './metadata-section/metadata-section.element';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { RecommendedVideoSectionComponent } from './recommended-video-section/recommended-video-section.component';
import './video-page.styles.scss';
import { store } from '../../../index';
import { CurrentVideoActions } from '../../../core/store/video-management/current-video/current-video.actions';

export class VideoPageComponent extends Component {
  private currentVideo;
  constructor() {
    super();
    store.subscribe(() => {
      if(this.currentVideo !== store.getState().videoManagement.currentVideo) {
        this.currentVideo = store.getState().videoManagement.currentVideo;
        if (this.currentVideo.video) {
          this.children = [
            new VideoPlayerElement(this.currentVideo.video),
            new MetadataSectionElement(this.currentVideo.video),
            new CommentSectionComponent(this.currentVideo.video.comments, this.currentVideo.video.id),
            new RecommendedVideoSectionComponent()
          ];
          this.children.forEach((item) => {
            item.setParent(this);
            item.init()
          });
          if (document.body.contains(this.componentHtml) && this.componentHtml.parentNode) {
            this.componentHtml.parentNode.removeChild(this.componentHtml);
            this.render();
          }
        }
      }
    });
  }
  onInit(): void {
    super.onInit();
    const splittedPath = window.location.pathname.split('/');
    const id = Number(splittedPath[splittedPath.length - 1]);
    store.dispatch(CurrentVideoActions.loadData(id));
  }
  render(): void {
    this.componentHtml = document.createElement('div');
    const videoSection = document.createElement('div');
    videoSection.className = 'video-section';
    const videoRenderContainer = document.createElement('div');
    videoRenderContainer.setAttribute('id', 'videoRenderPlaceholder');
    videoRenderContainer.className = 'video-render-placeholder';
    videoSection.appendChild(videoRenderContainer);
    const metadataInfos = document.createElement('div');
    metadataInfos.setAttribute('id', 'metadataInfos');
    metadataInfos.className = 'metadata-infos';
    videoSection.appendChild(metadataInfos);
    this.componentHtml.appendChild(videoSection);
    this.componentHtml.appendChild(document.createElement('hr'));
    const additionalInfoSection = document.createElement('div');
    additionalInfoSection.className = 'additional-info-section';
    const commentsRenderContainer = document.createElement('div');
    commentsRenderContainer.setAttribute('id', 'commentsRenderPlaceholder');
    commentsRenderContainer.className = 'comments-render-placeholder';
    additionalInfoSection.appendChild(commentsRenderContainer);
    const recommendedVideos = document.createElement('div');
    recommendedVideos.setAttribute('id', 'recommendedVideosPlaceholder');
    recommendedVideos.className = 'recommended-videos-placeholder';
    additionalInfoSection.appendChild(recommendedVideos);
    this.componentHtml.appendChild(additionalInfoSection);
    this.componentHtml.className = 'video-page-container';
    super.render('mainOverflowBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
