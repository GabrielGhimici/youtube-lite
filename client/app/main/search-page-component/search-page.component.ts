import { Component } from '../../../core/generic-components/component';
import { PreviewVideoFactory, VideoType } from '../preview-video/preview-video-factory';
import './search-page.styles.scss';

export class SearchPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  render(): void {
    const title = document.createElement('h4');
    title.innerHTML = 'Results';
    title.className = 'search-page-title';
    this.componentHtml.appendChild(title);
    const body = document.createElement('div');
    body.setAttribute('id', 'searchPageGrid');
    body.className = 'search-page-grid';
    this.componentHtml.appendChild(body);
    this.componentHtml.className = 'search-page-container';
    super.render('mainOverflowBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
