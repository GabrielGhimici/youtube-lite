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
    this.componentHtml.appendChild(loginHeader);

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
      placeholder: 'Birth date',
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
    this.componentHtml.appendChild(submitButton);
    this.componentHtml.className = 'sign-up-container';
    super.render();
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
