import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Selector } from '../../core';
import { AppState } from '../../app';
import { User } from '../models/user';


export function getUser(): Selector<AppState, User> {
  return state$ => state$
    .map(state => state.user)
    .distinctUntilChanged();
}
