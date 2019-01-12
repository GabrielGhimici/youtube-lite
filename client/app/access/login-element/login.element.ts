import { Element } from '../../../core/generic-components/element';
import { Router } from '../../../router/router';
import './login.styles.scss';

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
    const loginHeader = document.createElement('h3');
    loginHeader.innerHTML = 'Log in to your account';
    loginHeader.className = 'login-header';
    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';
    const emailInput = document.createElement('input');
    emailInput.setAttribute('id','emailInput');
    emailInput.setAttribute('type','email');
    emailInput.setAttribute('placeholder','Email address');
    emailInput.className = 'form-control';
    const emailError = document.createElement('div');
    emailError.setAttribute('id', 'emailError');
    emailError.innerHTML = 'Email error';
    emailError.className = 'invalid-feedback';
    emailGroup.appendChild(emailInput);
    emailGroup.appendChild(emailError);
    const passwordGroup = document.createElement('div');
    passwordGroup.className = 'form-group';
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('id','passwordInput');
    passwordInput.setAttribute('type','password');
    passwordInput.setAttribute('placeholder','Password');
    passwordInput.className = 'form-control';
    const passwordError = document.createElement('div');
    passwordError.setAttribute('id', 'passwordError');
    passwordError.className = 'invalid-feedback';
    passwordError.innerHTML = 'Password error';
    passwordGroup.appendChild(passwordInput);
    passwordGroup.appendChild(passwordError);
    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Log in';
    submitButton.className = 'btn btn-primary';
    const signUp = document.createElement('div');
    signUp.className = 'message-container';
    const signUpMessage = document.createElement('div');
    signUpMessage.innerHTML = 'Don\'t have an account?';
    const signUpButton = document.createElement('button');
    signUpButton.innerHTML = 'Sign up';
    signUpButton.className = 'btn btn-primary';
    signUpButton.addEventListener('click', this.goToRegister.bind(this));
    signUp.appendChild(signUpMessage);
    signUp.appendChild(signUpButton);
    this.componentHtml.appendChild(loginHeader);
    this.componentHtml.appendChild(emailGroup);
    this.componentHtml.appendChild(passwordGroup);
    this.componentHtml.appendChild(submitButton);
    this.componentHtml.appendChild(signUp);
    this.componentHtml.className = 'login-container';
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
