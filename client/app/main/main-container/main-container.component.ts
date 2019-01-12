import { Component } from '../../../core/generic-components/component';
import './main-container.styles.scss';

export class MainContainerComponent extends Component {
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-dark bg-primary';
    const logo = document.createElement('h3');
    logo.className = 'logo';
    logo.innerHTML = 'Youtube Lite';
    navBar.appendChild(logo);
    const user = document.createElement('div');
    user.innerHTML = 'Z';
    user.className = 'user-profile-badge';
    navBar.appendChild(user);
    this.componentHtml.appendChild(navBar);
    const body = document.createElement('div');
    body.setAttribute('id', 'mainOverflowBody');
    body.className = 'overflow-body';
    this.componentHtml.appendChild(body);
    this.componentHtml.className = 'main-page-container';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
