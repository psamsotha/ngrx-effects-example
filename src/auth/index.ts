import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { AuthEffects } from './auth.effects';


export { AuthActions, AuthService };
export { LoginResponse } from './models/login-response';

export * from './interfaces';


@NgModule({
  imports: [
    EffectsModule.run(AuthEffects)
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthActions,
        AuthService
      ]
    };
  }
}
