import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { Credentials } from './interfaces';
import { LoginResponse } from './models/login-response';
import { UserActions } from '../user';


@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService,
              private userActions: UserActions,
              private actions$: Actions) {}

  /**
   * On the LOGIN action, this effect will make a request to authenticate.
   * If not authenticated, it will emit a LOAD_USER_FAILURE action.
   * Otherwise, it will emit a LOAD_USER_SUCCESS action.
   */
  @Effect()
  login$ = this.actions$
    .ofType(AuthActions.LOGIN)
    .map(({payload}) => payload.credentials as Credentials)
    .switchMap(credentials => {
      return this.authService.login(credentials)
        .map((res: LoginResponse) => {
          if (res.isError) {
            return this.userActions.loadUserFailure(res.message);
          }
          return this.userActions.loadUserSuccess(res.user);
        });
    });
}
