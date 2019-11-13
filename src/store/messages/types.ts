export interface Message extends ApiResponse {
  chat: string;
  text: string;
  user: string;
  time: number;
}

export type ApiResponse = Record<string, any>;

export enum MessagesActionTypes {
  FETCH_MESSAGES = '@@messages/FETCH_MESSAGES',
  FETCH_SUCCESS = '@@messages/FETCH_SUCCESS',
  FETCH_ERROR = '@@messages/FETCH_ERROR',
  SEND_MESSAGE = '@@messages/SEND_MESSAGE',
  SEND_SUCCESS = '@@messages/SEND_SUCCESS',
  SEND_TO_NEW_CHAT_SUCCESS = '@@messages/SEND_TO_NEW_CHAT_SUCCESS',
  CLEAR_MESSAGES = '@@messages/CLEAR_MESSAGES'
}

export interface MessagesState {
  readonly loading: boolean;
  readonly data: Message[];
  readonly errors?: string;
}
