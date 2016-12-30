import { AuthActions } from './auth.actions';
import { Credentials } from './interfaces';


describe('auth', () => {
  describe('AuthActions', () => {
    let actions: AuthActions;

    beforeEach(() => {
      actions = new AuthActions();
    });

    describe('login()', () => {
      it('should create action', () => {
        let credentials: Credentials = {
          username: 'user',
          password: 'pass'
        };

        expect(actions.login(credentials)).toEqual({
          type: AuthActions.LOGIN,
          payload: { credentials }
        });
      })
    })
  });
});