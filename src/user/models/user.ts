import { Map, Record } from 'immutable';


export const USER_LOGGED_IN = 'Logged in';
export const USER_LOGGED_OUT = 'Logged out';
export const DEFAULT_USERNAME = 'Anonymous';

export interface UserData {
  id: number;
  username: string;
  imageUrl: string;
}

export interface User extends Map<string, any> {
  id: number;
  username: string;
  imageUrl: string;
  status: string;
}

export const UserRecord = Record({
  id: -1,
  username: DEFAULT_USERNAME,
  imageUrl: 'http://fake-gravatar-url.com',
  status: USER_LOGGED_OUT
});

export function createUser(user: UserData): User {
  return new UserRecord(user) as User;
}