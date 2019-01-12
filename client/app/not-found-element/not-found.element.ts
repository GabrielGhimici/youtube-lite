import { Element } from '../../core/generic-components/element';
import './not-found.styles.scss'

export class NotFoundElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    const errorHeader = document.createElement('p');
    errorHeader.innerHTML = 'Error code <span>404</span>';
    errorHeader.className = 'error-header';
    const separator = document.createElement('hr');
    const errorMessage = document.createElement('h3');
    errorMessage.innerHTML = 'Page not found!';
    const errorDetails = document.createElement('p');
    errorDetails.innerHTML = 'The requested resource could not be found.';
    messageContainer.appendChild(errorHeader);
    messageContainer.appendChild(separator);
    messageContainer.appendChild(errorMessage);
    messageContainer.appendChild(errorDetails);
    this.componentHtml.appendChild(messageContainer);
    this.componentHtml.className = 'not-found-container';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
