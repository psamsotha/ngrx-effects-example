import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './components/app.component';

import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { LoginModule } from '../login';
import { MockHttpModule } from '../http';

import { userReducer } from '../user';


export * from './interfaces';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      user: userReducer
    }),

    AuthModule.forRoot(),
    UserModule.forRoot(),
    LoginModule.forRoot(),
    MockHttpModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
