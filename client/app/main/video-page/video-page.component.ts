import { Component } from '../../../core/generic-components/component';
import { VideoPlayerElement } from './video-player/video-player.element';
import { MetadataSectionElement } from './metadata-section/metadata-section.element';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { RecommendedVideoSectionComponent } from './recommended-video-section/recommended-video-section.component';
import './video-page.styles.scss';

export class VideoPageComponent extends Component {
  constructor() {
    super();
    this.children.push(new VideoPlayerElement());
    this.children.push(new MetadataSectionElement());
    this.children.push(new CommentSectionComponent());
    this.children.push(new RecommendedVideoSectionComponent());
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
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
