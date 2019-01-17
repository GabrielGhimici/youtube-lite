import { Element } from '../../../core/generic-components/element';
import './add-video.styles.scss';
import { store } from '../../../index';
import { CurrentVideoActions } from '../../../core/store/video-management/current-video/current-video.actions';

export class AddVideoElement extends Element{
  constructor() {
    super();
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    this.componentHtml.remove();
    this.componentHtml = document.createElement('div');
    const addVideoForm = document.createElement('div');
    addVideoForm.className = 'add-video-form';
    const addVideoHeader = document.createElement('h3');
    addVideoHeader.innerHTML = 'Add new video';
    addVideoHeader.className = 'add-video-header';
    addVideoForm.appendChild(addVideoHeader);
    const alert = document.createElement('div');
    alert.setAttribute('id', 'addVideoAlert');
    alert.className = 'alert alert-danger dismiss';
    alert.innerHTML = 'Please check informations and try again.';
    addVideoForm.appendChild(alert);
    const success = document.createElement('div');
    success.setAttribute('id', 'addVideoSuccess');
    success.className = 'alert alert-success dismiss';
    success.innerHTML = 'Video added successfully.';
    addVideoForm.appendChild(success);
    [{
      type: 'text',
      identifier: 'addVideoName',
      placeholder: 'Enter video name',
      errValue: 'Enter video name'
    },
    {
      type: 'file',
      identifier: 'addVideoFile',
      placeholder: 'Select video file',
      errValue: 'Select video file'
    },
    {
      type: 'file',
      identifier: 'addVideoThumbnail',
      placeholder: 'Select thumbnail image file',
      errValue: 'Select thumbnail image file'
    }].forEach((item: any) => {
      addVideoForm.appendChild(
        this.renderFormControl(item.type, item.identifier, item.placeholder, item.errValue, item.type === 'file')
      );
    });
    const areaHolder = document.createElement('div');
    areaHolder.className = 'form-group';
    const area = document.createElement('textarea');
    area.setAttribute('id', 'addVideoTextArea');
    area.setAttribute('rows', '7');
    area.setAttribute('placeholder', 'Add video description...');
    area.className = 'form-control';
    areaHolder.appendChild(area);
    addVideoForm.appendChild(areaHolder);
    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Add video';
    submitButton.className = 'btn btn-primary';
    submitButton.addEventListener('click', this.saveVideo.bind(this));
    addVideoForm.appendChild(submitButton);
    this.componentHtml.appendChild(addVideoForm);
    this.componentHtml.className = 'add-video-container';
    super.render('mainOverflowBody');
  }
  saveVideo() {
    const nameValue = document.getElementById('addVideoNameInput')['value'];
    const descriptionValue = document.getElementById('addVideoTextArea')['value'];
    const videoFile = document.getElementById('addVideoFileInput')['files'][0];
    const thumbnailFile = document.getElementById('addVideoThumbnailInput')['files'][0];
    store.dispatch(CurrentVideoActions.saveData({
      name: nameValue,
      description: descriptionValue,
      videoFile,
      thumbnailFile
    }))
  }
  onChange(inputId: string, inputDataId: string) {
    document.getElementById(inputDataId)['value'] = document.getElementById(inputId)['files'][0].name;
    console.log(document.getElementById(inputId)['files'][0])
  }
  private renderFormControl(inputType: string, baseIdentifier: string, placeholder: string, errorDefaultValue: string, file: boolean = false) {
    const formControl = document.createElement('div');
    formControl.className = file ? 'input-group' : 'form-group';
    const formInput = document.createElement('input');
    formInput.setAttribute('id',`${baseIdentifier}Input`);
    formInput.setAttribute('type', inputType);
    formInput.setAttribute('placeholder', placeholder);
    if (file) {
      formInput.addEventListener('change', this.onChange.bind(this, `${baseIdentifier}Input`, `${baseIdentifier}DataInput`));
    }
    if (file && baseIdentifier === 'addVideoFile') {
      formInput.accept = 'video/mp4';
    }
    if (file && baseIdentifier === 'addVideoThumbnail') {
      formInput.accept = 'image/png, image/jpeg';
    }
    formInput.className = file ? 'custom-file-input' : 'form-control';
    formControl.appendChild(formInput);
    if (file) {
      const additionalInfo = document.createElement('div');
      additionalInfo.innerHTML = '<span class="input-group-text">Browse</span>';
      additionalInfo.className = 'input-group-append';
      const formDataInput = document.createElement('input');
      formDataInput.setAttribute('id',`${baseIdentifier}DataInput`);
      formDataInput.setAttribute('type', 'text');
      formDataInput.setAttribute('placeholder', placeholder);
      formDataInput.className = 'form-control';
      formControl.appendChild(formDataInput);
      formControl.appendChild(additionalInfo);
    }
    const formError = document.createElement('div');
    formError.setAttribute('id', `${baseIdentifier}Error`);
    formError.innerHTML = errorDefaultValue;
    formError.className = 'invalid-feedback';
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
