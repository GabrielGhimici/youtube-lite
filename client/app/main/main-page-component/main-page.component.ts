import { Component } from '../../../core/generic-components/component';
import './main-page.styles.scss';
import { store } from '../../../index';
import { PreviewVideoFactory, VideoType } from '../preview-video/preview-video-factory';
import { Video } from '../../../core/store/video-management/video';

export class MainPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
    store.subscribe(() => {
      const mainVideos = store.getState().videoManagement.mainVideos.items;
      this.children = [];
      mainVideos.forEach((video: Video) => {
        this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView, video));
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
    title.innerHTML = 'Recommended videos';
    title.className = 'main-page-title';
    this.componentHtml.appendChild(title);
    const body = document.createElement('div');
    body.setAttribute('id', 'mainPageGrid')
    body.className = 'main-page-grid';
    this.componentHtml.appendChild(body);
    this.componentHtml.className = 'main-page-container';
    super.render('mainOverflowBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
