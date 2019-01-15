import { Element } from '../../../../core/generic-components/element';
import './grid-view-video.styles.scss'

export class GridViewVideoElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', 'https://i.vimeocdn.com/video/749825438.webp?mw=900&mh=507');
    thumbnail.className = 'grid-view-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const title = document.createElement('div');
    title.setAttribute('title', 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest');
    title.innerHTML = "Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest";
    title.className = 'grid-view-video-title';
    this.componentHtml.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', 'Owner');
    owner.innerHTML = "Owner";
    owner.className = 'grid-view-video-owner';
    this.componentHtml.appendChild(owner);
    this.componentHtml.className = 'grid-view-video-container';
    super.render('mainPageGrid');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
