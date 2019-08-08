export interface Dialogue extends ApiResponse {
  id: number;
  Between: [];
  DialogueId: number;
}

export type ApiResponse = Record<string, any>;

export enum DialoguesActionTypes {
  FETCH_DIALOGUES = "@@dialogues/FETCH_DIALOGUES",
  FETCH_SUCCESS = "@@dialogues/FETCH_SUCCESS",
  FETCH_ERROR = "@@dialogues/FETCH_ERROR",
}

export interface DialoguesState {
  readonly loading: boolean;
  readonly data: Dialogue[];
  readonly errors?: string;
}
