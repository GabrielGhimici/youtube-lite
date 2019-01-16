import { Element } from '../../../../core/generic-components/element';
import './grid-view-video.styles.scss'
import { Video } from '../../../../core/store/video-management/video';
import { Router } from '../../../../router/router';

export class GridViewVideoElement extends Element{
  private router: Router;
  constructor(private data: Video = new Video()) {
    super();
    this.router = new Router()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', this.data.thumbnailUrl);
    thumbnail.className = 'grid-view-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const title = document.createElement('div');
    title.setAttribute('title', this.data.name);
    title.innerHTML = this.data.name;
    title.className = 'grid-view-video-title';
    this.componentHtml.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', `${this.data.owner.firstName} ${this.data.owner.lastName}`);
    owner.innerHTML = `${this.data.owner.firstName} ${this.data.owner.lastName}`;
    owner.className = 'grid-view-video-owner';
    this.componentHtml.appendChild(owner);
    this.componentHtml.className = 'grid-view-video-container';
    this.componentHtml.addEventListener('click', this.goToVideo.bind(this));
    super.render('mainPageGrid');
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
