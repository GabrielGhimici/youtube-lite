import { Component } from '../../core/generic-components/component';

export class MainPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const element = document.createElement('h1');
    element.innerText = 'This is my main page of youtube lite!';
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
