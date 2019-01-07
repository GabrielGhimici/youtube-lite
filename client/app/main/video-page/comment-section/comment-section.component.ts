import { Component } from '../../../../core/generic-components/component';
import { CommentElement } from './comment.element';

export class CommentSectionComponent extends Component {
  constructor() {
    super();
    let i = 0;
    while (i < 5) {
      this.children.push(new CommentElement());
      i++;
    }
    this.children.forEach((item) => {
      item.setParent(this);
    })
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const element = document.createElement('h1');
    element.innerText = 'This is my comment-section of youtube lite!';
    element.style.textDecoration = 'underline';
    element.style.fontStyle = 'italic';
    this.componentHtml.appendChild(element);
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
