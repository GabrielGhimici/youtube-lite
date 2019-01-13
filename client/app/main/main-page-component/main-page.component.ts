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
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Searched));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.Recommended));
    this.children.push(PreviewVideoFactory.createVideo(VideoType.GridView));
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  render(): void {
    const user = document.createElement('div');
    user.innerHTML = 'This is main page';
    store.subscribe(() => {
      console.log("STORE BITCH", store.getState());
    });
    this.componentHtml.appendChild(user);
    super.render('mainOverflowBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
