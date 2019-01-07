import { Component } from '../../../core/generic-components/component';
import { VideoPlayerElement } from './video-player.element';
import { MetadataSectionElement } from './metadata-section.element';
import { CommentSectionComponent } from './comment-section/comment-section.component';

export class VideoPageComponent extends Component {
  constructor() {
    super();
    this.children.push(new VideoPlayerElement());
    this.children.push(new MetadataSectionElement());
    this.children.push(new CommentSectionComponent());
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const element = document.createElement('h1');
    element.innerText = 'This is my video page of youtube lite!';
    element.style.textDecoration = 'underline';
    element.style.fontStyle = 'italic';
    this.componentHtml.appendChild(element);
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
