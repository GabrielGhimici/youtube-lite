import { Element } from '../../../../core/generic-components/element';
import './recommended-video.styles.scss';

export class RecommendedVideoElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', 'https://i.vimeocdn.com/video/749825438.webp?mw=900&mh=507');
    thumbnail.className = 'recommended-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const rightContainer = document.createElement('div');
    rightContainer.className = 'recommended-video-right-container';
    const title = document.createElement('div');
    title.setAttribute('title', 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest');
    title.innerHTML = "Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest";
    title.className = 'recommended-video-title';
    rightContainer.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', 'Owner');
    owner.innerHTML = "Owner";
    owner.className = 'recommended-video-owner';
    rightContainer.appendChild(owner);
    this.componentHtml.appendChild(rightContainer);
    this.componentHtml.className = 'recommended-video-container';
    super.render('recommendedVideoSection');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
