import { Element } from '../../../core/generic-components/element';
import './sign-up.styles.scss';

export class SignUpElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const loginHeader = document.createElement('h3');
    loginHeader.innerHTML = 'Sign up';
    loginHeader.className = 'sign-up-header';

    const firstNameGroup = document.createElement('div');
    firstNameGroup.className = 'form-group';
    const firstNameInput = document.createElement('input');
    firstNameInput.setAttribute('id','firstNameInput');
    firstNameInput.setAttribute('type','text');
    firstNameInput.setAttribute('placeholder','First name');
    firstNameInput.className = 'form-control';
    const firstNameError = document.createElement('div');
    firstNameError.setAttribute('id', 'firstNameError');
    firstNameError.innerHTML = 'First name error';
    firstNameError.className = 'invalid-feedback';
    firstNameGroup.appendChild(firstNameInput);
    firstNameGroup.appendChild(firstNameError);

    const lastNameGroup = document.createElement('div');
    lastNameGroup.className = 'form-group';
    const lastNameInput = document.createElement('input');
    lastNameInput.setAttribute('id','lastNameInput');
    lastNameInput.setAttribute('type','text');
    lastNameInput.setAttribute('placeholder','Last name');
    lastNameInput.className = 'form-control';
    const lastNameError = document.createElement('div');
    lastNameError.setAttribute('id', 'lastNameError');
    lastNameError.innerHTML = 'last name error';
    lastNameError.className = 'invalid-feedback';
    lastNameGroup.appendChild(lastNameInput);
    lastNameGroup.appendChild(lastNameError);

    const birthDateGroup = document.createElement('div');
    birthDateGroup.className = 'form-group';
    const birthDateInput = document.createElement('input');
    birthDateInput.setAttribute('id','birthDateInput');
    birthDateInput.setAttribute('type','text');
    birthDateInput.setAttribute('placeholder','Birth date');
    birthDateInput.className = 'form-control';
    const birthDateError = document.createElement('div');
    birthDateError.setAttribute('id', 'birthDateError');
    birthDateError.innerHTML = 'Birth date error';
    birthDateError.className = 'invalid-feedback';
    birthDateGroup.appendChild(birthDateInput);
    birthDateGroup.appendChild(birthDateError);

    const genderGroup = document.createElement('div');
    genderGroup.className = 'form-group';
    const genderSelect = document.createElement('select');
    genderSelect.setAttribute('id','genderSelect');
    genderSelect.setAttribute('placeholder','Gender');
    genderSelect.className = 'form-control';
    const genderMale = document.createElement('option');
    genderMale.innerHTML = 'Male';
    const genderFemale = document.createElement('option');
    genderFemale.innerHTML = 'Female';
    genderSelect.appendChild(genderMale);
    genderSelect.appendChild(genderFemale);
    const genderError = document.createElement('div');
    genderError.setAttribute('id', 'genderError');
    genderError.innerHTML = 'Birth date error';
    genderError.className = 'invalid-feedback';
    genderGroup.appendChild(genderSelect);
    genderGroup.appendChild(genderError);

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

    const confirmPasswordGroup = document.createElement('div');
    confirmPasswordGroup.className = 'form-group';
    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.setAttribute('id','confirmPasswordInput');
    confirmPasswordInput.setAttribute('type','password');
    confirmPasswordInput.setAttribute('placeholder','Confirm password');
    confirmPasswordInput.className = 'form-control';
    const confirmPasswordError = document.createElement('div');
    confirmPasswordError.setAttribute('id', 'passwordError');
    confirmPasswordError.className = 'invalid-feedback';
    confirmPasswordError.innerHTML = 'Password error';
    confirmPasswordGroup.appendChild(confirmPasswordInput);
    confirmPasswordGroup.appendChild(confirmPasswordError);

    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Create account';
    submitButton.className = 'btn btn-primary';

    this.componentHtml.appendChild(loginHeader);
    this.componentHtml.appendChild(firstNameGroup);
    this.componentHtml.appendChild(lastNameGroup);
    this.componentHtml.appendChild(birthDateGroup);
    this.componentHtml.appendChild(genderGroup);
    this.componentHtml.appendChild(emailGroup);
    this.componentHtml.appendChild(passwordGroup);
    this.componentHtml.appendChild(confirmPasswordGroup);
    this.componentHtml.appendChild(submitButton);
    this.componentHtml.className = 'sign-up-container';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
