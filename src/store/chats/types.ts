import { User } from '../users/types';

export interface Chat extends ApiResponse {
  id: number;
  participants: Participants;
  chatId: number;
}

export interface Participants {
  from: User;
  to: User;
}

export type ApiResponse = Record<string, any>;

export enum ChatsActionTypes {
  FETCH_CHATS = '@@chats/FETCH_CHATS',
  FETCH_SUCCESS = '@@chats/FETCH_SUCCESS',
  FETCH_ERROR = '@@chats/FETCH_ERROR',
}

export interface ChatsState {
  readonly loading: boolean;
  readonly data: Chat[];
  readonly errors?: string;
}
