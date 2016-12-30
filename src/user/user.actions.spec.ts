import { UserActions } from './user.actions';
import { UserData} from './models/user';


describe('user', () => {
  describe('UserActions', () => {
    let actions: UserActions;

    beforeEach(() => {
      actions = new UserActions();
    });

    describe('loadUserSuccess()', () => {
      it('should return the action', () => {
        let user: UserData = {
          id: 1,
          username: 'user',
          imageUrl: 'some-url'
        };

        let action = actions.loadUserSuccess(user);
        expect(action).toEqual({
          type: UserActions.LOAD_USER_SUCCESS,
          payload: { user }
        });
      });
    });

    describe('loadUserFailure', () => {
      it('should return the action', () => {
        let message = 'Not Authorized';

        let action = actions.loadUserFailure(message);
        expect(action).toEqual({
          type: UserActions.LOAD_USER_FAILURE,
          payload: { message }
        });
      });
    });
  });
});
