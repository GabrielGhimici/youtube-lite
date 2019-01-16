import { Component } from '../../../core/generic-components/component';
import { PreviewVideoFactory, VideoType } from '../preview-video/preview-video-factory';
import './search-page.styles.scss';
import { store } from '../../../index';
import { Video } from '../../../core/store/video-management/video';

export class SearchPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
    store.subscribe(() => {
      const mainVideos = store.getState().videoManagement.filteredVideos.items;
      this.children = [];
      mainVideos.forEach((video: Video) => {
        this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched, video));
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
  render(): void {
    this.componentHtml = document.createElement('div');
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
