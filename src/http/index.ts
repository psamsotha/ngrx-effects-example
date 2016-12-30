import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Http, HttpModule, XHRBackend, RequestOptions, Response, ResponseOptions } from '@angular/http';

import { MockLoginHttp } from './mock-http';


export { MockLoginHttp };
export { testingUserData, FAILED_LOGIN_MESSAGE } from './mock-http';


@NgModule({
  imports: [
    HttpModule
  ],
})
export class MockHttpModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MockHttpModule,
      providers: [
        {
          provide: Http,
          deps: [XHRBackend, RequestOptions],
          useFactory: (backend: XHRBackend, options: RequestOptions) => {
            return new MockLoginHttp(backend, options);
          }
        }
      ]
    };
  }
}
