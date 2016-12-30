import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserActions } from './user.actions';


export { UserActions };
export { getUser } from './reducers/user.selectors';
export { UserState, userReducer } from './reducers/user.reducers';
export { UserData, UserRecord, User, createUser } from './models/user';
export { DEFAULT_USERNAME, USER_LOGGED_IN, USER_LOGGED_OUT } from './models/user';


@NgModule({

})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        UserActions
      ]
    }
  }
}
