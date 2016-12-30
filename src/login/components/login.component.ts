import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app';
import { AuthActions, Credentials } from '../../auth'

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(private store$: Store<AppState>,
              private authActions: AuthActions) {}

  login(form: any) {
    this.store$.dispatch(this.authActions.login({
      username: form.username,
      password: form.password
    }));
  }
}
