import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AuthActions, Credentials } from '../../auth';
import { LoginComponent } from './login.component';


describe('login', () => {
  describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;
    let actions: AuthActions;
    let store: Store<any>;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        providers: [ AuthActions],
        imports: [
          FormsModule,
          StoreModule.provideStore({})
        ]
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      store = injector.get(Store);
      actions = injector.get(AuthActions);
    });

    describe('login()', () => {
      it(`should dispatch the ${AuthActions.LOGIN} action`, () => {
        spyOn(store, 'dispatch');

        component.login({ username: 'user', password: 'pass' });

        expect(store.dispatch).toHaveBeenCalledWith(
          actions.login({ username: 'user', password: 'pass' })
        );
      });
    });
  });
});