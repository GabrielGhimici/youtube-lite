import { Element } from '../../../core/generic-components/element';
import './sign-up.styles.scss';
import { store } from '../../../index';
import { User } from '../../../core/store/user-management/user/user';
import { UserActions } from '../../../core/store/user-management/user/user.actions';

export class SignUpElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
    store.subscribe(() => {
      const currentUserState = store.getState().userManagement.userData;
      const alert = document.getElementById('signUpAlert');
      const success = document.getElementById('signUpSuccess');
      if (currentUserState.saving === false && currentUserState.error) {
        alert.innerHTML = 'There was a problem on user saving. Please try again!';
        alert.classList.remove('dismiss');
      }
      if (currentUserState.saving === false && !currentUserState.error) {
        alert.classList.add('dismiss');
        success.classList.remove('dismiss');
      }
    })
  }
  render(): void {
    const loginHeader = document.createElement('h3');
    loginHeader.innerHTML = 'Sign up';
    loginHeader.className = 'sign-up-header';
    this.componentHtml.appendChild(loginHeader);
    const alert = document.createElement('div');
    alert.setAttribute('id', 'signUpAlert');
    alert.className = 'alert alert-danger dismiss';
    alert.innerHTML = '';
    this.componentHtml.appendChild(alert);
    const success = document.createElement('div');
    success.setAttribute('id', 'signUpSuccess');
    success.className = 'alert alert-success dismiss';
    success.innerHTML = 'User added successfully. You can login now.';
    this.componentHtml.appendChild(success);
    [{
      type: 'text',
      identifier: 'firstName',
      placeholder: 'First name',
      errValue: 'First name error'
    }, {
      type: 'text',
      identifier: 'lastName',
      placeholder: 'Last name',
      errValue: 'Last name error'
    }, {
      type: 'text',
      identifier: 'birthDate',
      placeholder: 'Birth date (mm/dd/yyyy)',
      errValue: 'Birth date error'
    }, {
      identifier: 'gender',
      errValue: 'Gender error',
      options: ['Male', 'Female']
    }, {
      type: 'email',
      identifier: 'email',
      placeholder: 'Email',
      errValue: 'Email error'
    }, {
      type: 'password',
      identifier: 'password',
      placeholder: 'Password',
      errValue: 'Password error'
    }, {
      type: 'password',
      identifier: 'confirmPassword',
      placeholder: 'Password confirmation',
      errValue: 'Password confirmation error'
    }].forEach((item: any) => {
      this.componentHtml.appendChild(
        item.type ?
          this.renderFormControl(item.type, item.identifier, item.placeholder, item.errValue) :
          this.renderSelect(item.identifier, item.errValue, item.options)
      );
    });

    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Create account';
    submitButton.className = 'btn btn-primary';
    submitButton.addEventListener('click', this.submitUser.bind(this));
    this.componentHtml.appendChild(submitButton);
    this.componentHtml.className = 'sign-up-container';
    super.render();
  }

  submitUser() {
    const controlValues = [
      document.getElementById('firstNameInput')['value'],
      document.getElementById('lastNameInput')['value'],
      document.getElementById('birthDateInput')['value'],
      document.getElementById('genderSelect')['value'],
      document.getElementById('emailInput')['value'],
      document.getElementById('passwordInput')['value'],
      document.getElementById('confirmPasswordInput')['value'],
    ];
    const alert = document.getElementById('signUpAlert');
    const dateRegEx = new RegExp(/^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/g);
    const completedValues = controlValues.reduce((accumulator, el) => {
      accumulator = accumulator && !!el;
      return accumulator
    }, true);
    if (!completedValues) {
      alert.innerHTML = 'Please provide all details about the user.';
      alert.classList.remove('dismiss');
    } else if (controlValues[5] !== controlValues[6]) {
      alert.innerHTML = 'Passwords doesn\'t match.';
      alert.classList.remove('dismiss');
    } else if (!dateRegEx.test(controlValues[2])) {
      alert.innerHTML = 'Please provide birth date in format mm/dd/yyyy.';
      alert.classList.remove('dismiss');
    } else {
      alert.classList.add('dismiss');
      const user = new User(
        -1,
        controlValues[4],
        controlValues[0],
        controlValues[1],
        controlValues[2],
        controlValues[3],
      );
      store.dispatch(UserActions.saveStart(user, controlValues[5]));
    }
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

  private renderSelect(baseIdentifier: string, errorDefaultValue: string, optionValues: string[]) {
    const selectControl = document.createElement('div');
    selectControl.className = 'form-group';
    const selectElement = document.createElement('select');
    selectElement.setAttribute('id', `${baseIdentifier}Select`);
    selectElement.className = 'form-control';
    optionValues.forEach(value => {
      const option = document.createElement('option');
      option.innerHTML = value;
      selectElement.appendChild(option);
    });
    const genderError = document.createElement('div');
    genderError.setAttribute('id', `${baseIdentifier}Error`);
    genderError.innerHTML = errorDefaultValue;
    genderError.className = 'invalid-feedback';
    selectControl.appendChild(selectElement);
    selectControl.appendChild(genderError);
    return selectControl
  }

  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
