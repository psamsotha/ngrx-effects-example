import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './components/login.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule
    }
  }
}
