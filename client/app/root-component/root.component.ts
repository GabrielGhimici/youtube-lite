import { Component } from '../../core/generic-components/component';
import './root.styles.scss';

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
    this.componentHtml.className = 'root-app-container';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
