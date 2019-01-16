import { Element } from '../../../../../core/generic-components/element';
import './comment.style.scss';
import { Comment } from '../../../../../core/store/video-management/comment';
import * as moment from 'moment';

export class CommentElement extends Element{
  constructor(private data: Comment = new Comment()) {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const userDetails = document.createElement('div');
    userDetails.className = 'comment-info';
    const userBadge = document.createElement('div');
    userBadge.innerHTML = this.data.owner.firstName[0].toUpperCase();
    userBadge.className = 'comment-owner-badge';
    userDetails.appendChild(userBadge);
    const userInfos = document.createElement('div');
    userInfos.className = 'comment-details';
    const userName = document.createElement('div');
    userName.innerHTML = `${this.data.owner.firstName} ${this.data.owner.lastName} - ${this.data.creationDate ? moment(this.data.creationDate).format('DD MMM YYYY') : ''}`;
    userName.className = 'comment-owner-details';
    userInfos.appendChild(userName);
    const uploadDate = document.createElement('div');
    uploadDate.innerHTML = this.data.content;
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
