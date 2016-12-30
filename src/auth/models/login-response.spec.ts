import { is, Record } from 'immutable';
import { Response, ResponseOptions } from '@angular/http';
import { LoginResponseRecord, LoginResponse, createLoginResponse } from './login-response';
import { AUTHENTICATED_RESPONSE_MSG, DEFAULT_RESPONSE_MSG } from './login-response';
import { createUser } from '../../user';


describe('auth', () => {
  describe('LoginResponse', () => {
    
    it('should be an instance of Immutable.Record', () => {
      let res = new LoginResponseRecord();
      expect(res instanceof Record).toBe(true);
    });

    it('should contain default properties', () => {
      let res = new LoginResponseRecord() as LoginResponse;

      expect(res.status).toBe(401);
      expect(res.isError).toBe(true);
      expect(res.message).toBe(DEFAULT_RESPONSE_MSG);
      expect(res.user).toBe(null);
    });

    describe('createLoginResponse()', () => {
      it('should create the LoginResponse with success Response', () => {
        const userData = {
          id: 1,
          username: 'peeskillet',
          imageUrl: 'http://fake-image.com'
        };
        let response = new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(userData),
        }));

        let loginResponse = createLoginResponse(response);
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.isError).toBe(false);
        expect(is(loginResponse.user, createUser(userData))).toBe(true);
        expect(loginResponse.message).toBe(AUTHENTICATED_RESPONSE_MSG);
      });

      it('should create the LoginResponse with error Response', () => {
        let response = new Response(new ResponseOptions({
          status: 401,
          body: 'Unauthorized',
        }));

        let loginResponse = createLoginResponse(response);
        expect(loginResponse.status).toBe(401);
        expect(loginResponse.isError).toBe(true);
        expect(loginResponse.user).toBeNull();
        expect(loginResponse.message).toBe('Unauthorized');
      });
    });
  });
});