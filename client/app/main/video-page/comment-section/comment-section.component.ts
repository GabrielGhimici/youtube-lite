import { Component } from '../../../../core/generic-components/component';
import { CommentElement } from './comment/comment.element';
import './comment-section.style.scss'
import { Comment } from '../../../../core/store/video-management/comment';
import { store } from '../../../../index';
import { CurrentVideoActions } from '../../../../core/store/video-management/current-video/current-video.actions';

export class CommentSectionComponent extends Component {
  constructor(private data: Array<Comment> = [], private videoId: number = null) {
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
    area.addEventListener('input', this.onAreaInputChange.bind(this));
    area.className = 'form-control';
    areaHolder.appendChild(area);
    this.componentHtml.appendChild(areaHolder);
    const submitButtonHolder = document.createElement('div');
    submitButtonHolder.className = 'submit-holder';
    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submitCommentButton');
    submitButton.addEventListener('click', this.addComment.bind(this));
    submitButton.disabled = true;
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
  onAreaInputChange(event) {
    console.log(event);
    if (document.getElementById('submitCommentButton')) {
      if (event.target.value) {
        document.getElementById('submitCommentButton')['disabled'] = false;
      } else {
        document.getElementById('submitCommentButton')['disabled'] = true;
      }
    }
  }
  addComment() {
    store.dispatch(CurrentVideoActions.addCommentStart(this.videoId, document.getElementById('commentTextArea')['value']))
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
