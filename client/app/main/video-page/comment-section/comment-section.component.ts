import { Component } from '../../../../core/generic-components/component';
import { CommentElement } from './comment/comment.element';
import './comment-section.style.scss'
import { Comment } from '../../../../core/store/video-management/comment';

export class CommentSectionComponent extends Component {
  constructor(private data: Array<Comment> = []) {
    super();
    this.data.forEach(elem => {
      this.children.push(new CommentElement(elem))
    });
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const areaHolder = document.createElement('div');
    areaHolder.className = 'form-group';
    const areaLabel = document.createElement('label');
    areaLabel.setAttribute('for', 'commentTextArea');
    areaLabel.innerHTML = 'Add your comment';
    areaHolder.appendChild(areaLabel);
    const area = document.createElement('textarea');
    area.setAttribute('id', 'commentTextArea');
    area.setAttribute('rows', '4');
    area.className = 'form-control';
    areaHolder.appendChild(area);
    this.componentHtml.appendChild(areaHolder);
    const submitButtonHolder = document.createElement('div');
    submitButtonHolder.className = 'submit-holder';
    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Comment';
    submitButton.className = 'btn btn-primary';
    submitButtonHolder.appendChild(submitButton);
    this.componentHtml.appendChild(submitButtonHolder);
    const commentsHolder = document.createElement('div');
    commentsHolder.setAttribute('id', 'commentSectionBody');
    commentsHolder.className = 'comments-holder';
    this.componentHtml.appendChild(commentsHolder);
    this.componentHtml.className = 'comment-section-container';
    super.render('commentsRenderPlaceholder');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
