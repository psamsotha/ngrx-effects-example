import { is, Record } from 'immutable';

import { User, UserRecord, UserData, createUser } from './user';
import { DEFAULT_USERNAME, USER_LOGGED_OUT } from './user';


describe('user models', () => {
  describe('User', () => {

    it('should be an instance of Immitable.Record', () => {
      let user = new UserRecord();
      expect(user instanceof Record).toBe(true);
    });

    it('shoud contain default properties', () => {
      let user = new UserRecord() as User;

      expect(user.id).toBe(-1);
      expect(user.username).toBe(DEFAULT_USERNAME);
      expect(user.status).toBe(USER_LOGGED_OUT);
    });

    describe('createUser', () => {
      it('shoud create the User', () => {
        let userData: UserData = {
          id: 1,
          username: 'user',
          imageUrl: 'some-url'
        };

        let user = createUser(userData);
        expect(user instanceof UserRecord);
        expect(user.id).toBe(userData.id);
        expect(user.username).toBe(userData.username);
        expect(user.imageUrl).toBe(userData.imageUrl);
      });
    });
  });
});
