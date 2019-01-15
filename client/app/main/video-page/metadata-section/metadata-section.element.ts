import { Element } from '../../../../core/generic-components/element';
import './metadata-section.styles.scss'

export class MetadataSectionElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const title = document.createElement('div');
    title.setAttribute('title', 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest');
    title.innerHTML = "Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest";
    title.className = 'metadata-section-title';
    this.componentHtml.appendChild(title);
    this.componentHtml.appendChild(document.createElement('hr'));
    const userDetails = document.createElement('div');
    userDetails.className = 'metadata-section-owner-info';
    const userBadge = document.createElement('div');
    userBadge.innerHTML = "S";
    userBadge.className = 'metadata-section-owner-badge';
    userDetails.appendChild(userBadge)
    const userInfos = document.createElement('div');
    userInfos.className = 'metadata-section-owner-details';
    const userName = document.createElement('div');
    userName.innerHTML = 'Name';
    userName.className = 'metadata-section-owner-details-item';
    userInfos.appendChild(userName);
    const uploadDate = document.createElement('div');
    uploadDate.innerHTML = 'Date';
    uploadDate.className = 'metadata-section-owner-details-item';
    userInfos.appendChild(uploadDate);
    userDetails.appendChild(userInfos);
    this.componentHtml.appendChild(userDetails);
    const userActions = document.createElement('div');
    userActions.className = 'btn-group';
    const likeButton = document.createElement('button');
    likeButton.innerHTML = '12345 <i class="material-icons small-icon">thumb_up</i>';
    likeButton.className = 'btn btn-primary flex-button';
    userActions.appendChild(likeButton);
    const dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = '12345 <i class="material-icons small-icon">thumb_down</i>';
    dislikeButton.className = 'btn btn-primary flex-button';
    userActions.appendChild(dislikeButton);
    const shareButton = document.createElement('button');
    shareButton.innerHTML = 'Share <i class="material-icons small-icon">open_in_new</i>';
    shareButton.className = 'btn btn-primary flex-button';
    userActions.appendChild(shareButton);
    this.componentHtml.appendChild(userActions);
    this.componentHtml.appendChild(document.createElement('hr'));
    const description = document.createElement('div');
    description.innerHTML = 'Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest, Some long title, very long title, maybe the longest';
    description.className = 'metadata-section-description';
    this.componentHtml.appendChild(description);
    this.componentHtml.className = 'metadata-section-container';
    super.render('metadataInfos');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
