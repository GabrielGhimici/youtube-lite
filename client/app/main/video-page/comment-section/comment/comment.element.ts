import { Element } from '../../../../../core/generic-components/element';
import './comment.style.scss';

export class CommentElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const userDetails = document.createElement('div');
    userDetails.className = 'comment-info';
    const userBadge = document.createElement('div');
    userBadge.innerHTML = "S";
    userBadge.className = 'comment-owner-badge';
    userDetails.appendChild(userBadge);
    const userInfos = document.createElement('div');
    userInfos.className = 'comment-details';
    const userName = document.createElement('div');
    userName.innerHTML = 'Name - Date';
    userName.className = 'comment-owner-details';
    userInfos.appendChild(userName);
    const uploadDate = document.createElement('div');
    uploadDate.innerHTML = 'Date';
    uploadDate.className = 'comment-content';
    userInfos.appendChild(uploadDate);
    userDetails.appendChild(userInfos);
    this.componentHtml.appendChild(userDetails);
    this.componentHtml.className = 'comment-container';
    super.render('commentSectionBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
