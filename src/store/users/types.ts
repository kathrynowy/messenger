import { Dialogue } from "../dialogues/types";

export interface User extends ApiResponse {
  Dialogues: string[]
  Username: string
  UserId: number
}

export type ApiResponse = Record<string, any>

export enum UsersActionTypes {
  FETCH_REQUEST = '@@users/FETCH_USER',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR',
  GET_USER = '@@users/GET_USER',
}

export interface UsersState {
  readonly loading: boolean
  readonly data: User[]
  readonly errors?: string
}
