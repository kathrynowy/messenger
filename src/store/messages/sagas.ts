import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { sendMessageWithSocket } from '../../socket';
import { addChatSuccess, changeLastMessage } from '../chats/actions';
import { fetchError, fetchSuccess, sendSuccess, sendToNewChatSuccess } from './actions';
import { MessagesActionTypes } from './types';


function* getMessages(actionData: AnyAction) {
  try {
    const { chatId, userId } = actionData.payload;
    const isNeededToReadMessages = actionData.payload.isNeededToReadMessages === undefined;
    const { data } = yield call(() =>
      axios.get(`message/all?chatId=${chatId}&user=${userId}&isNeededToReadMessages=${!isNeededToReadMessages}`)
    );

    yield put(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* sendMessage(actionData: AnyAction) {
  try {
    const { chatId, text, user, toUserId, isNewChat } = actionData.payload;
    const time = new Date().getTime();
    let message: any;

    if (isNewChat) {
      const chat = yield call(() => axios.post(`chat/add`, { usersId: [toUserId, user] }));
      message = yield call(() => axios.post('message/add', { chat: chat.data._id, text, user, time }));
      const newChat = yield call(() => axios.get(`chat/${chat.data._id}`));

      yield put(sendToNewChatSuccess(message.data));
      yield put(addChatSuccess(newChat.data));
    } else {
      message = yield call(() => axios.post('message/add', { chat: chatId, text, user, time }));
      const newChat = yield call(() => axios.get(`chat/${message.data.chat}`));

      yield put(sendSuccess(message.data));
      yield put(changeLastMessage(newChat.data));
    }

    sendMessageWithSocket(message.data, toUserId);
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* watchFetchRequest() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, getMessages);
}

function* watchMessageSending() {
  yield takeEvery(MessagesActionTypes.SEND_MESSAGE, sendMessage);
}

function* messagesSaga() {
  yield all([fork(watchFetchRequest), fork(watchMessageSending)]);
}


export { messagesSaga };
