import { User } from '../users/types';

export interface Chat extends ApiResponse {
  id: number;
  participants: Participants;
  chatId: number;
  lastMessageTime: string;
  lastMessageText: string;
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
  ADD_CHAT = '@@chats/ADD_CHAT',
  ADD_CHAT_SUCCESS = '@@chats/ADD_CHAT_SUCCESS',
  CHANGE_LAST_MESSAGE = '@@chats/CHANGE_LAST_MESSAGE'
}

export interface ChatsState {
  readonly loading: boolean;
  readonly data: Chat[];
  readonly errors?: string;
}
