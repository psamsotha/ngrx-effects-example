import { is } from 'immutable';
import { UserActions } from '../user.actions';
import { userReducer, UserState } from './user.reducers';
import { UserRecord, UserData, User, USER_LOGGED_IN } from '../models/user';


describe('user', () => {
  describe('userReducer', () => {
    let actions: UserActions;

    beforeEach(() => {
      actions = new UserActions();
    });

    describe(`${UserActions.LOAD_USER_SUCCESS} action`, () => {
      it('should return user with new info', () => {
        let userData: UserData = {
          id: 1,
          username: 'peeskillet',
          imageUrl: 'dummyUrl'
        };

        let user: User = userReducer(undefined, actions.loadUserSuccess(userData)) as User;
        expect(is(user, new UserRecord(Object.assign(userData, { status: USER_LOGGED_IN })))).toBe(true);
      });
    });

    describe(`${UserActions.LOAD_USER_FAILURE} action`, () => {
      it('should return default user', () => {
        let user: User = userReducer(undefined, actions.loadUserFailure('Bad log in')) as User;
        expect(is(user, new UserRecord())).toBe(true);
      });
    });
  });
});