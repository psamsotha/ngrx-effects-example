import 'rxjs/add/observable/of';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, Injector } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User, UserData, UserRecord, createUser, userReducer } from '../../user';
import { DEFAULT_USERNAME, USER_LOGGED_IN } from '../../user';
import { AppComponent } from './app.component';


@Component({
  selector: 'login',
  template: ''
})
class MockLoginComponent {}


describe('app', () => {
  describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let injector: Injector;

    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          MockLoginComponent
        ],
        imports: [
          StoreModule.provideStore({ user: userReducer })
        ]
      });

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });


    describe('default user state', () => {

      function createDefaultUser() {
        component.user = Observable.of(new UserRecord() as User);
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should display user name', async(() => {
        createDefaultUser().then(() => {
          let el = fixture.nativeElement.querySelector('.user-name');
          expect(el.textContent).toBe(DEFAULT_USERNAME);
        });
      }));

      it('should show logged out image', async(() => {
        createDefaultUser().then(() => {
          let el = fixture.nativeElement.querySelector('.logged-out-img');
          expect(el).not.toBeNull();
        });
      }));

      it('should not show user image', async(() => {
        createDefaultUser().then(() => {
          let el = fixture.nativeElement.querySelector('.user-image');
          expect(el).toBeNull();
        });
      }));
    });


    describe('updated user state', () => {
      function updateUser() {
        component.user = Observable.of(createUser({
          id: 1,
          username: 'new user',
          imageUrl: 'fake-url',
          status: USER_LOGGED_IN
        } as UserData));

        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should show user name', async(() => {
        updateUser().then(() => {
          let el = fixture.nativeElement.querySelector('.user-name');
          expect(el.textContent).toBe('new user');
        });
      }));

      it('should not show logged out image', async(() => {
        updateUser().then(() => {
          let el = fixture.nativeElement.querySelector('.logged-out-img');
          expect(el).toBeNull();
        });
      }));

      it('should not show user image', async(() => {
        updateUser().then(() => {
          let el = fixture.nativeElement.querySelector('.user-image');
          expect(el).not.toBeNull();
          expect(el.src).toContain('fake-url');
        });
      }));
    });

  });
});
