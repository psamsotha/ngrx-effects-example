import { TestBed, async } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';

import { Credentials } from '../auth';
import { LOGIN_URL } from '../constants';
import { MockHttpModule, MockLoginHttp, FAILED_LOGIN_MESSAGE, testingUserData } from './index';


describe('http', () => {
  describe('MockLoginHttp', () => {
    let http: Http;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        imports: [
          MockHttpModule.forRoot()
        ]
      });

      http = injector.get(Http);
    });

    it('should be an instance of MockLoginHttp', () => {
      expect(http instanceof MockLoginHttp).toBe(true);
    });

    describe('post()', () => {
      it('sould mock success response', async(() => {
        let credentials:Credentials = {
          username: 'Peeskillet',
          password: 'pass'
        };
        http.post(LOGIN_URL, credentials).subscribe(res => {
          expect(res.status).toBe(200);
          expect(res.statusText).toBe('OK');
          expect(res.text()).toBe(testingUserData);
        });
      }));

      it('sould mock failed response', async(() => {
        let credentials:Credentials = {
          username: 'bad',
          password: 'credentials'
        };
        http.post(LOGIN_URL, credentials).subscribe(res => {
          expect(res.status).toBe(401);
          expect(res.statusText).toBe('Unauthorized');
          expect(res.text()).toBe(FAILED_LOGIN_MESSAGE);
        });
      }));
    });
  });
});