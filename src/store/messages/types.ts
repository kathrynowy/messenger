export interface Message extends ApiResponse {
  Dialogue: string;
  Text: string;
  User: string;
  Time: number;
}

export type ApiResponse = Record<string, any>;

export enum MessagesActionTypes {
  FETCH_MESSAGES = "@@messages/FETCH_MESSAGES",
  FETCH_SUCCESS = "@@messages/FETCH_SUCCESS",
  FETCH_ERROR = "@@messages/FETCH_ERROR",
  SEND_MESSAGE = "@@messages/SEND_MESSAGE",
  SEND_SUCCESS = "@@messages/SEND_SUCCESS",
}

export interface MessagesState {
  readonly loading: boolean;
  readonly data: Message[];
  readonly errors?: string;
}
