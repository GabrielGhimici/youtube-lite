import { Element } from '../../../../core/generic-components/element';
import './recommended-video.styles.scss';
import { Video } from '../../../../core/store/video-management/video';
import { Router } from '../../../../router/router';

export class RecommendedVideoElement extends Element{
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
    thumbnail.className = 'recommended-video-thumbnail';
    this.componentHtml.appendChild(thumbnail);
    const rightContainer = document.createElement('div');
    rightContainer.className = 'recommended-video-right-container';
    const title = document.createElement('div');
    title.setAttribute('title', this.data.name);
    title.innerHTML = this.data.name;
    title.className = 'recommended-video-title';
    rightContainer.appendChild(title);
    const owner = document.createElement('div');
    owner.setAttribute('title', `${this.data.owner.firstName} ${this.data.owner.lastName}`);
    owner.innerHTML = `${this.data.owner.firstName} ${this.data.owner.lastName}`;
    owner.className = 'recommended-video-owner';
    rightContainer.appendChild(owner);
    this.componentHtml.appendChild(rightContainer);
    this.componentHtml.className = 'recommended-video-container';
    this.componentHtml.addEventListener('click', this.goToVideo.bind(this));
    super.render('recommendedVideoSection');
  }

  goToVideo() {
    this.router.redirectTo(['..', `${this.data.id}`]);
  }

  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
