import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import { Injectable, NgModule, ModuleWithProviders } from '@angular/core';
import { Http, HttpModule, XHRBackend, RequestOptions, Response, ResponseOptions } from '@angular/http';

import { LOGIN_URL } from '../constants';
import { Credentials } from '../auth';


/* only exporting for testing purposes */
export const testingUserData = JSON.stringify({
  id: 1,
  username: 'Peeskillet',
  imageUrl: 'https://i.stack.imgur.com/w9jTN.jpg?s=328&g=1'
});

export const FAILED_LOGIN_MESSAGE = 'Unauthorized';


@Injectable()
export class MockLoginHttp extends Http {
  constructor(private backend: XHRBackend, private ops: RequestOptions) {
    super(backend, ops);
  }

  post(url: string, body: any, options: RequestOptions): Observable<Response> {
    if (url === LOGIN_URL) {
      if (this.verifyCredentials(body as Credentials)) {
        return this.createResponse({
          body: testingUserData,
          status: 200,
          statusText: 'OK'
        });
      } else {
        return this.createResponse({
          body: FAILED_LOGIN_MESSAGE,
          status: 401,
          statusText: 'Unauthorized'
        });
      }
    }
    return super.post(url, body, options);
  }

  private createResponse(args: {body: string, status: number, statusText: string}) {
    return Observable.of(new Response(new ResponseOptions(args)));
  }

  private verifyCredentials(credentials: Credentials): boolean {
    return credentials.username === 'Peeskillet' && credentials.password === 'pass';
  }
}
