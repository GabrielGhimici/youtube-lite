import { Component } from '../../../core/generic-components/component';
import './main-page.styles.scss';
import { store } from '../../../index';
import { PreviewVideoFactory, VideoType } from '../preview-video/preview-video-factory';

export class MainPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  render(): void {
    store.subscribe(() => {
      console.log("STORE BITCH", store.getState());
    });
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
