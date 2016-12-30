import { Map, Record } from 'immutable';
import { Response } from '@angular/http';
import { UserData, createUser } from '../../user';


export const DEFAULT_RESPONSE_MSG = 'Not logged in';
export const AUTHENTICATED_RESPONSE_MSG = 'Authenticated';


export interface LoginResponse extends Map<string, any> {
  status: number;
  isError: boolean;
  message: string;
  user: UserData;
}

export const LoginResponseRecord = Record({
  status: 401,
  isError: true,
  message: DEFAULT_RESPONSE_MSG,
  user: null
});

export function createLoginResponse(res: Response): LoginResponse {
  let resData = {
    status: res.status
  };

  if (res.status === 200) {
    resData = Object.assign(resData, {
      isError: false,
      user: createUser(res.json() as UserData),
      message: AUTHENTICATED_RESPONSE_MSG
    });
  } else {
    resData = Object.assign(resData, {
      message: res.text()
    });
  }

  return new LoginResponseRecord(resData) as LoginResponse;
}