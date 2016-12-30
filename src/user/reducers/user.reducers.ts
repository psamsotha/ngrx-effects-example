import { Map } from 'immutable';
import { Action, ActionReducer } from '@ngrx/store';
import { UserRecord, USER_LOGGED_IN } from '../models/user';
import { UserActions } from '../user.actions';


export type UserState = Map<string, any>;

const initialState: UserState = new UserRecord() as UserState;

export const userReducer: ActionReducer<UserState> = (state = initialState, {type, payload}: Action) => {
  switch (type) {
    case UserActions.LOAD_USER_SUCCESS:
      const { user } = payload;
      return state.withMutations(currentUser => {
        currentUser
          .set('id', user.id)
          .set('username', user.username)
          .set('imageUrl', user.imageUrl)
          .set('status', USER_LOGGED_IN);
      });
    case UserActions.LOAD_USER_FAILURE:
      return initialState;

    default:
      return state;
  }
};
