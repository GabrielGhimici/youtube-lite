import { combineEpics, ofType } from 'redux-observable';
import { UserActions, UserActionTypes } from './user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import http from '../../../http';
import { User } from './user';
import { from, of } from 'rxjs';
import { PayloadAction } from '../../payload-action';

export class UserEpics {
  public createEpics() {
    return combineEpics(
      this.loadCurrentUser(),
      this.saveUser()
    )
  }

  private loadCurrentUser() {
    return action$ => action$.pipe(
      ofType(UserActionTypes.LoadProfile),
      switchMap(action => {
        return from(http.get('/api/users/me')).pipe(
          switchMap((req: any) => {
            return of(req.data);
          }),
          map((result: any) => {
            const user = new User();
            user.id = result[0].id;
            user.firstName = result[0].firstName;
            user.lastName = result[0].lastName;
            user.email = result[0].email;
            user.gender = result[0].gender;
            user.birthDate = result[0].birthDate;
            return UserActions.loadSucceeded(user);
          }),
          catchError(err => of(UserActions.loadFailed(err)))
        )
      })
    )
  }

  private saveUser() {
    return action$ => action$.pipe(
      ofType(UserActionTypes.SaveStarted),
      switchMap((action: PayloadAction) => {
        const payload = {
          email: action.payload.user.email,
          password: action.payload.password,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          gender: action.payload.user.gender,
          birthDate: action.payload.user.birthDate
        };
        return from(http.post('/api/users', payload)).pipe(
          switchMap((req: any) => {
            return of(req.data);
          }),
          map((result: any) => {
            const user = new User();
            user.id = result.id;
            user.firstName = result.firstName;
            user.lastName = result.lastName;
            user.email = result.email;
            user.gender = result.gender;
            user.birthDate = result.birthDate;
            return UserActions.saveSucceeded(user);
          }),
          catchError(err => of(UserActions.loadFailed(err)))
        )
      })
    )
  }
}
