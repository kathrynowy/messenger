import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { ChatsReducer } from './chats/reducer';
import { chatsSaga } from './chats/sagas';
import { ChatsState } from './chats/types';
import { MessagesReducer } from './messages/reducer';
import { messagesSaga } from './messages/sagas';
import { MessagesState } from './messages/types';
import { usersReducer } from './users/reducer';
import {usersSaga} from './users/sagas';
import { UsersState } from './users/types';

export interface ApplicationState {
  users: UsersState;
  router: RouterState;
  chats: ChatsState;
  messages: MessagesState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    chats: ChatsReducer,
    messages: MessagesReducer,
    router: connectRouter(history),
    users: usersReducer,
  });

export function* rootSaga() {
  yield all([fork(usersSaga), fork(chatsSaga), fork(messagesSaga)]);
}
