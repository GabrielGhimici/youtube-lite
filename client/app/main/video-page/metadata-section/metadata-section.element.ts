import { Element } from '../../../../core/generic-components/element';
import './metadata-section.styles.scss'
import { Video } from '../../../../core/store/video-management/video';
import * as moment from 'moment';
import { store } from '../../../../index';
import { CurrentVideoActions } from '../../../../core/store/video-management/current-video/current-video.actions';

export class MetadataSectionElement extends Element{
  constructor(private data: Video = new Video()) {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    this.componentHtml.remove();
    this.componentHtml = document.createElement('div');
    const title = document.createElement('div');
    title.setAttribute('title', this.data.name);
    title.innerHTML = this.data.name;
    title.className = 'metadata-section-title';
    this.componentHtml.appendChild(title);
    this.componentHtml.appendChild(document.createElement('hr'));
    const userDetails = document.createElement('div');
    userDetails.className = 'metadata-section-owner-info';
    const userBadge = document.createElement('div');
    userBadge.innerHTML = this.data.owner.firstName[0].toUpperCase();
    userBadge.className = 'metadata-section-owner-badge';
    userDetails.appendChild(userBadge);
    const userInfos = document.createElement('div');
    userInfos.className = 'metadata-section-owner-details';
    const userName = document.createElement('div');
    userName.innerHTML = `${this.data.owner.firstName} ${this.data.owner.lastName}`;
    userName.className = 'metadata-section-owner-details-item';
    userInfos.appendChild(userName);
    const uploadDate = document.createElement('div');
    uploadDate.innerHTML = `${this.data.metadata.uploadDate ? moment(this.data.metadata.uploadDate).format('DD MMM YYYY') : ''}`;
    uploadDate.className = 'metadata-section-owner-details-item';
    userInfos.appendChild(uploadDate);
    userDetails.appendChild(userInfos);
    this.componentHtml.appendChild(userDetails);
    const userActions = document.createElement('div');
    userActions.className = 'btn-group';
    const likeButton = document.createElement('button');
    likeButton.innerHTML = `${this.data.metadata.likes} <i class="material-icons small-icon">thumb_up</i>`;
    likeButton.addEventListener('click', this.doLike.bind(this));
    likeButton.className = 'btn btn-primary flex-button';
    userActions.appendChild(likeButton);
    const dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = `${this.data.metadata.dislikes} <i class="material-icons small-icon">thumb_down</i>`;
    dislikeButton.addEventListener('click', this.doDislike.bind(this));
    dislikeButton.className = 'btn btn-primary flex-button';
    userActions.appendChild(dislikeButton);
    const shareButton = document.createElement('button');
    shareButton.innerHTML = `Share <i class="material-icons small-icon">open_in_new</i>`;
    shareButton.className = 'btn btn-primary flex-button';
    ($(shareButton)
      .attr('data-toggle', 'popover')
      .attr('data-placement', 'bottom')
      .attr('title', 'Share link')
      .attr('data-content', `${window.location.href}`) as any)
      .popover('show');
    userActions.appendChild(shareButton);
    this.componentHtml.appendChild(userActions);
    this.componentHtml.appendChild(document.createElement('hr'));
    const description = document.createElement('div');
    description.innerHTML = this.data.metadata.description;
    description.className = 'metadata-section-description';
    this.componentHtml.appendChild(description);
    this.componentHtml.className = 'metadata-section-container';
    super.render('metadataInfos');
  }
  doLike() {
    store.dispatch(CurrentVideoActions.likeStart(this.data.metadata.id));
  }
  doDislike() {
    store.dispatch(CurrentVideoActions.dislikeStart(this.data.metadata.id));
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
