import { Element } from '../../../core/generic-components/element';
import { Router } from '../../../router/router';
import './login.styles.scss';
import { store } from '../../../index';
import { AuthorizationActions } from '../../../core/store/user-management/authorization/authorization.actions';

export class LoginElement extends Element{
  private router: Router;
  constructor() {
    super();
    this.router = new Router();
  }
  onInit(): void {
    super.onInit();
    store.subscribe(() => {
      const currentLoginState = store.getState().userManagement.authorization;
      const alert = document.getElementById('loginAlert');
      if (currentLoginState.loading == false && currentLoginState.error) {
        alert.classList.remove('dismiss');
      }
      if (currentLoginState.isLoggedIn) {
        alert.classList.add('dismiss');
        this.router.redirectTo(['..', '..', 'app'])
      }
    })
  }
  render(): void {
    const loginHeader = document.createElement('h3');
    loginHeader.innerHTML = 'Log in to your account';
    loginHeader.className = 'login-header';
    this.componentHtml.appendChild(loginHeader);
    const alert = document.createElement('div');
    alert.setAttribute('id', 'loginAlert');
    alert.className = 'alert alert-danger dismiss';
    alert.innerHTML = 'Please check credentials and try again.';
    this.componentHtml.appendChild(alert);
    [{
      type: 'email',
      identifier: 'email',
      placeholder: 'Enter email',
      errValue: 'Email error'
    }, {
      type: 'password',
      identifier: 'password',
      placeholder: 'Enter password',
      errValue: 'Password error'
    }].forEach((item: any) => {
      this.componentHtml.appendChild(
        this.renderFormControl(item.type, item.identifier, item.placeholder, item.errValue)
      );
    });
    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Log in';
    submitButton.className = 'btn btn-primary';
    submitButton.addEventListener('click', this.doLogin.bind(this));
    this.componentHtml.appendChild(submitButton);
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
    this.componentHtml.appendChild(signUp);
    this.componentHtml.className = 'login-container';
    super.render();
  }

  doLogin() {
    const emailValue = document.getElementById('emailInput')['value'];
    const passwordValue = document.getElementById('passwordInput')['value'];
    const alert = document.getElementById('loginAlert');
    if (emailValue && passwordValue) {
      if (!alert.classList.contains('dismiss')) {
        alert.classList.add('dismiss');
      }
      store.dispatch(AuthorizationActions.loginStart({
        email: emailValue,
        password: passwordValue
      }))
    } else {
      alert.classList.remove('dismiss');
    }
  }

  goToRegister() {
    this.router.redirectTo(['..', 'register']);
  }

  private renderFormControl(inputType: string, baseIdentifier: string, placeholder: string, errorDefaultValue: string) {
    const formControl = document.createElement('div');
    formControl.className = 'form-group';
    const formInput = document.createElement('input');
    formInput.setAttribute('id',`${baseIdentifier}Input`);
    formInput.setAttribute('type',inputType);
    formInput.setAttribute('placeholder',placeholder);
    formInput.className = 'form-control';
    const formError = document.createElement('div');
    formError.setAttribute('id', `${baseIdentifier}Error`);
    formError.innerHTML = errorDefaultValue;
    formError.className = 'invalid-feedback';
    formControl.appendChild(formInput);
    formControl.appendChild(formError);
    return formControl;
  }

  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
