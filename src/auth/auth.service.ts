import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LOGIN_URL } from '../constants';
import { AppState } from '../app';
import { Credentials } from './interfaces';
import { AuthActions } from './auth.actions';
import { LoginResponse, createLoginResponse } from './models/login-response';


@Injectable()
export class AuthService {

  constructor(private http: Http,
              private store$: Store<AppState>,
              private actions: AuthActions) {}

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post(LOGIN_URL, credentials)
      .map(res => createLoginResponse(res));
  }

  _isErrorStatus(res: Response): boolean {
    const status = res.status;
    return status === 200 ? true : false;
  }
}
