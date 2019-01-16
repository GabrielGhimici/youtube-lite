import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthorizationActions, AuthorizationActionTypes } from './authorization.actions';
import { PayloadAction } from '../../payload-action';
import http from '../../../http';
import { from, of } from 'rxjs';
import { UserActions } from '../user/user.actions';

export class AuthorizationEpics {
  public createEpic() {
    return combineEpics(
      this.loginEpic(),
      this.logoutEpic()
    )
  }

  private loginEpic() {
    return action$ => action$.pipe(
      ofType(AuthorizationActionTypes.LoginStarted),
      switchMap((action: PayloadAction) => {
        return from(http.post('/auth/login', action.payload)).pipe(
          switchMap((data: any) => {
            return of(
              AuthorizationActions.loginSucceeded(),
              UserActions.loadProfile()
            );
          }),
          catchError((error) => of(AuthorizationActions.loginFailed(error)))
        );
      })
    );
  }

  private logoutEpic() {
    return action$ => action$
      .pipe(
        ofType(AuthorizationActionTypes.LogoutStarted),
        switchMap(action => {
          return from(http.post('/auth/logout')).pipe(
              map(() => AuthorizationActions.logoutSucceeded()),
              catchError((error) => of(AuthorizationActions.logoutFailed(error)))
            )
        })
      );
  }
}
