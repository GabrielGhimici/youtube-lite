import { Component } from '../../../../core/generic-components/component';
import { PreviewVideoFactory, VideoType } from '../../preview-video/preview-video-factory';
import './recommended-video-section.styles.scss'

export class RecommendedVideoSectionComponent extends Component {
  constructor() {
    super();
    let i = 0;
    while (i < 5) {
      this.children.push(PreviewVideoFactory.createVideo(VideoType.Recommended));
      i++;
    }
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
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
