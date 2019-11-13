export interface User extends ApiResponse {
  chats: string[];
  username: string;
  userId: number;
}

export type ApiResponse = Record<string, any>;

export enum UsersActionTypes {
  FETCH_REQUEST = '@@users/FETCH_USER',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR',
  GET_USER = '@@users/GET_USER',
  SIGN_UP = '@@users/SIGN_UP',
  SIGN_IN = '@@users/SIGN_IN',
  SIGN_IN_SUCCESS = '@@users/SIGN_IN_SUCCESS',
  GET_USERS = '@@users/GET_USERS',
  GET_USERS_SUCCESS = '@@users/GET_USERS_SUCCESS'
}

export interface UsersState {
  readonly loading: boolean;
  readonly data: User[];
  readonly errors?: string;
  readonly currentUser: any;
}
