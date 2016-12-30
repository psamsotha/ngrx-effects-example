import 'rxjs/add/observable/of';

import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { Credentials} from './interfaces';
import { LoginResponse, LoginResponseRecord } from './models/login-response';
import { UserActions, userReducer } from '../user';

import { MockHttpModule, testingUserData, FAILED_LOGIN_MESSAGE } from '../http';


describe('auth', () => {
  describe('AuthEffects', () => {
    let runner: EffectsRunner;
    let effects: AuthEffects;
    let authActions: AuthActions;
    let userActions: UserActions;
    let authService: AuthService;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        imports: [
          EffectsTestingModule,
          MockHttpModule,
          StoreModule.provideStore({
            user: userReducer
          })
        ],
        providers: [
          AuthEffects,
          AuthActions,
          UserActions,
          AuthService
        ]
      });

      runner = injector.get(EffectsRunner);
      effects = injector.get(AuthEffects);
      authActions = injector.get(AuthActions);
      userActions = injector.get(UserActions);
      authService = injector.get(AuthService);
    });

    describe('login$ effect', () => {
      it(`should return ${UserActions.LOAD_USER_SUCCESS} action`, async(() => {
        spyOnLogin({
          status: 200,
          isError: false,
          message: null,
          user: JSON.parse(testingUserData)});
      
        runner.queue(authActions.login({ username: 'user', password: 'pass' }));

        effects.login$.subscribe(action => {
          expect(action).toEqual(userActions.loadUserSuccess(JSON.parse(testingUserData)));
        });
      }));

      it(`should return ${UserActions.LOAD_USER_FAILURE} action`, async(() => {
        spyOnLogin({
          status: 401,
          isError: true,
          message: FAILED_LOGIN_MESSAGE,
          user: null});

        runner.queue(authActions.login({ username: 'no', password: 'good' }));

        effects.login$.subscribe(action => {
          expect(action).toEqual(userActions.loadUserFailure(FAILED_LOGIN_MESSAGE));
        });
      }));
    });

    function spyOnLogin(attrs: any) {
      spyOn(authService, 'login').and.returnValue(
        Observable.of(new LoginResponseRecord(attrs)));
    }
  });
});
