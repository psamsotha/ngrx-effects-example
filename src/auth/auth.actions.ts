import { Action } from '@ngrx/store';
import { Credentials } from './interfaces';


export class AuthActions {
  static readonly LOGIN = 'LOGIN';


  login(credentials: Credentials): Action {
    return {
      type: AuthActions.LOGIN,
      payload: { credentials }
    };
  }
}
