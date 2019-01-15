import { Element } from '../../../../core/generic-components/element';
import './searched-video.styles.scss';

export class SearchedVideoElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', 'https://i.vimeocdn.com/video/749825438.webp?mw=900&mh=507');
    thumbnail.className = 'searched-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const rightContainer = document.createElement('div');
    rightContainer.className = 'searched-video-right-container';
    const title = document.createElement('div');
    title.setAttribute('title', 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest');
    title.innerHTML = "Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest";
    title.className = 'searched-video-title';
    rightContainer.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', 'Owner - Upload date');
    owner.innerHTML = 'Owner - Upload date';
    owner.className = 'searched-video-owner';
    rightContainer.appendChild(owner);
    const description = document.createElement('div');
    description.innerHTML = 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest';
    description.className = 'searched-video-description';
    rightContainer.appendChild(description);
    this.componentHtml.appendChild(rightContainer);
    this.componentHtml.className = 'searched-video-container';
    super.render('searchPageGrid');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
