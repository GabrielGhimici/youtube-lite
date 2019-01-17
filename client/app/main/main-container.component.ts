import { Component } from '../../core/generic-components/component';
import './main-container.styles.scss';
import { store } from '../../index';
import { VideoListActions } from '../../core/store/video-management/video-list/video-list.actions';
import { ListType } from '../../core/store/video-management/video-management.reducer';
import { Router } from '../../router/router';
import * as moment from 'moment';
import {
  AuthorizationActions
} from '../../core/store/user-management/authorization/authorization.actions';

export class MainContainerComponent extends Component {
  private router: Router;
  private user: any;
  constructor() {
    super();
    this.router = new Router();
    this.user = null;
  }
  onInit(): void {
    super.onInit();
    store.subscribe(() => {
      if (this.user !== store.getState().userManagement.userData.user) {
        this.user = store.getState().userManagement.userData.user;
        if (document.body.contains(this.componentHtml) && this.componentHtml.parentNode) {
          this.componentHtml.parentNode.removeChild(this.componentHtml);
          this.render();
        }
      }
    });
    store.dispatch(VideoListActions.loadData(ListType.Main));
    store.dispatch(VideoListActions.loadData(ListType.Filtered, {q: ''}));
  }
  render(): void {
    this.componentHtml = document.createElement('div');
    const navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-dark bg-primary';
    const logo = document.createElement('h3');
    logo.className = 'logo';
    logo.innerHTML = 'Youtube Lite';
    navBar.appendChild(logo);
    const rightContainer = document.createElement('div');
    rightContainer.className = 'navbar-right-container';
    const searchField = document.createElement('input');
    searchField.setAttribute('id','searchInput');
    searchField.setAttribute('type','search');
    searchField.setAttribute('placeholder','Search video');
    searchField.className = 'form-control spacing-right';
    rightContainer.appendChild(searchField);
    const searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'searchButton');
    searchButton.addEventListener('click', this.goToSearch.bind(this));
    searchButton.className = 'btn btn-outline-light spacing-right-2';
    searchButton.innerHTML = 'Search';
    rightContainer.appendChild(searchButton);
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    const user = document.createElement('div');
    user.setAttribute('id', 'dropdownUser');
    user.setAttribute('data-toggle', 'dropdown');
    user.setAttribute('aria-haspopup', 'true');
    user.setAttribute('aria-expanded', 'false');
    user.innerHTML = this.user ? this.user.firstName[0].toUpperCase() : '?';
    user.className = 'user-profile-badge';
    dropdown.appendChild(user);
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu dropdown-menu-right';
    dropdownMenu.setAttribute('aria-labelledby', 'dropdownUser');
    const nameElement = document.createElement('div');
    nameElement.className = 'dropdown-item-text';
    nameElement.innerHTML =
      `<span class="label">Name</span>
      <span class="name">${this.user ? this.user.firstName + ' ' + this.user.lastName : '-'}</span>`;
    dropdownMenu.appendChild(nameElement);
    const emailElement = document.createElement('div');
    emailElement.className = 'dropdown-item-text'
    emailElement.innerHTML =
      `<span class="label">Email</span>
      <span class="name">${this.user ? this.user.email : '-'}</span>`;
    dropdownMenu.appendChild(emailElement);
    const genderElement = document.createElement('div');
    genderElement.className = 'dropdown-item-text';
    genderElement.innerHTML =
      `<span class="label">Gender</span>
      <span class="name">${this.user ? this.user.gender : '-'}</span>`;
    dropdownMenu.appendChild(genderElement);
    const birthdayElement = document.createElement('div');
    birthdayElement.className = 'dropdown-item-text';
    birthdayElement.innerHTML =
      `<span class="label">Birthdate</span>
      <span class="name">${this.user ? moment(this.user.birthDate).format('dddd MMMM, YYYY') : '-'}</span>`;
    dropdownMenu.appendChild(birthdayElement);
    const divider = document.createElement('div');
    divider.className = 'dropdown-divider';
    dropdownMenu.appendChild(divider);
    const addVideoButton = document.createElement('button');
    addVideoButton.className = 'dropdown-item';
    addVideoButton.innerHTML = 'Add video';
    addVideoButton.addEventListener('click', this.goToAddVideo.bind(this));
    dropdownMenu.appendChild(addVideoButton);
    const logoutButton = document.createElement('button');
    logoutButton.className = 'dropdown-item';
    logoutButton.innerHTML = 'Logout';
    logoutButton.addEventListener('click', this.doLogout.bind(this));
    dropdownMenu.appendChild(logoutButton);
    dropdown.appendChild(dropdownMenu);
    rightContainer.appendChild(dropdown);
    navBar.appendChild(rightContainer);
    this.componentHtml.appendChild(navBar);
    const body = document.createElement('div');
    body.setAttribute('id', 'mainOverflowBody');
    body.className = 'overflow-body';
    this.componentHtml.appendChild(body);
    this.componentHtml.className = 'main-container';
    super.render();
  }
  goToAddVideo() {
    this.router.redirectTo(['/', 'app', 'add-video']);
  }
  doLogout() {
    store.dispatch(AuthorizationActions.logoutStart());
    this.router.redirectTo(['/', 'account', 'login']);
  }
  goToSearch() {
    const searchValue = document.getElementById('searchInput')['value'];
    store.dispatch(VideoListActions.loadData(ListType.Filtered, {q: searchValue}));
    this.router.redirectTo(['/', 'app', 'search'])
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
