import { Element } from '../../../../core/generic-components/element';
import './searched-video.styles.scss';
import { Video } from '../../../../core/store/video-management/video';
import * as moment from 'moment';
import { Router } from '../../../../router/router';

export class SearchedVideoElement extends Element{
  private router: Router;
  constructor(private data: Video = new Video()) {
    super();
    this.router = new Router();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', this.data.thumbnailUrl);
    thumbnail.className = 'searched-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const rightContainer = document.createElement('div');
    rightContainer.className = 'searched-video-right-container';
    const title = document.createElement('div');
    title.setAttribute('title', this.data.name);
    title.innerHTML = this.data.name;
    title.className = 'searched-video-title';
    rightContainer.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', `${this.data.owner.firstName} ${this.data.owner.lastName} - ${this.data.metadata.uploadDate ? moment(this.data.metadata.uploadDate).format('DD MMM YYYY') : ''}`);
    owner.innerHTML = `${this.data.owner.firstName} ${this.data.owner.lastName} - ${this.data.metadata.uploadDate ? moment(this.data.metadata.uploadDate).format('DD MMM YYYY') : ''}`;
    owner.className = 'searched-video-owner';
    rightContainer.appendChild(owner);
    const description = document.createElement('div');
    description.innerHTML = this.data.metadata.description;
    description.className = 'searched-video-description';
    rightContainer.appendChild(description);
    this.componentHtml.appendChild(rightContainer);
    this.componentHtml.className = 'searched-video-container';
    this.componentHtml.addEventListener('click',this.goToVideo.bind(this));
    super.render('searchPageGrid');
  }
  goToVideo() {
    this.router.redirectTo(['..', 'video', `${this.data.id}`]);
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
