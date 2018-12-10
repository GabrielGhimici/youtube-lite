import { Component } from './generic-components/component';

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
    this.componentHtml = document.createElement('h1');
    this.componentHtml.innerText = 'This is my first page of youtube lite!';
    this.componentHtml.style.textDecoration = 'underline';
    this.componentHtml.style.color = '#008CA2';
    this.componentHtml.style.fontStyle = 'italic';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
