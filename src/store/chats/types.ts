import { User } from '../users/types';

export interface Chat extends ApiResponse {
  id: string;
  participants: Participants;
  chatId: number;
  lastMessageTime: string;
  lastMessageText: string;
  unreadMessages: number;
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
  CHANGE_LAST_MESSAGE = '@@chats/CHANGE_LAST_MESSAGE',
  CLEAR_UNREAD_MESSAGES = '@@chats/CLEAR_UNREAD_MESSAGES'
}

export interface ChatsState {
  readonly loading: boolean;
  readonly data: Chat[];
  readonly errors?: string;
}
