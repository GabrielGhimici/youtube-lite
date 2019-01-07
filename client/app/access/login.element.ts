import { Element } from '../../core/generic-components/element';
import { Router } from '../../router/router';

export class LoginElement extends Element{
  private router: Router;
  constructor() {
    super();
    this.router = new Router();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const element = document.createElement('h1');
    element.innerText = 'This is my login page of youtube lite!';
    element.style.textDecoration = 'underline';
    element.style.fontStyle = 'italic';
    this.componentHtml.appendChild(element);
    const button = document.createElement('button');
    button.innerText = 'GoToRegister';
    button.addEventListener('click', this.goToRegister.bind(this));
    this.componentHtml.appendChild(button);
    super.render();
  }

  goToRegister() {
    this.router.redirectTo(['..', 'register']);
  }

  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
