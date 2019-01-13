import { Component } from '../../core/generic-components/component';
import './root.styles.scss';
import { from } from 'rxjs';
import http from '../../core/http';
import { AuthorizationActions } from '../../core/store/user-management/authorization/authorization.actions';
import { UserActions } from '../../core/store/user-management/user/user.actions';
import { store } from '../../index';
import { Router } from '../../router/router';

export class RootComponent extends Component{
  private router: Router;
  constructor() {
    super();
    this.router = new Router();
  }
  onInit(): void {
    this.parent = new Component();
    if (this.parent) {
      this.parent.componentHtml = document.getElementById('root-app');
    }
    from(http.get('/auth/token_info')).subscribe(req => {
      if (req.data && req.data.OK) {
        store.dispatch(AuthorizationActions.loginSucceeded());
        store.dispatch(UserActions.loadProfile());
        this.router.redirectTo(['/','app', 'main']);
      }
    });
    super.onInit();
  }
  render(): void {
    this.componentHtml.className = 'root-app-container';
    super.render();
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
