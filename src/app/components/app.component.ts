import '../../../public/css/styles.scss';
import 'rxjs/add/operator/let';

import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../interfaces';
import { getUser, User } from '../../user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  user: Observable<User>;

  constructor(private store$: Store<AppState>) {
    this.user = this.store$.let(getUser());
  }
}
