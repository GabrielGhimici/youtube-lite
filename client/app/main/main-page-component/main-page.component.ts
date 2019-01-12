import { Component } from '../../../core/generic-components/component';
import './main-page.styles.scss';

export class MainPageComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const user = document.createElement('div');
    user.innerHTML = 'This is main page';
    this.componentHtml.appendChild(user);
    super.render('mainOverflowBody');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
