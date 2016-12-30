import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserActions } from './user.actions';


export { UserActions };
export { getUser } from './reducers/user.selectors';
export { UserState, userReducer } from './reducers/user.reducers';
export { UserData, User, createUser } from './models/user';


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
