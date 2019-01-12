import { Component } from '../core/generic-components/component';

export class RootComponent extends Component{
  constructor() {
    super();
  }
  onInit(): void {
    this.parent = new Component();
    if (this.parent) {
      this.parent.componentHtml = document.getElementById('root-app');
    }
    super.onInit();
  }
  render(): void {
    const element = document.createElement('h1');
    element.innerText = 'This is my first page of youtube lite!';
    element.style.textDecoration = 'underline';
    element.style.fontStyle = 'italic';
    this.componentHtml.appendChild(element);
    const element1 = document.createElement('div');
    element1.innerText = 'Some alert!';
    element1.className = 'alert alert-primary';
    this.componentHtml.appendChild(element1);
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
