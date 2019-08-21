import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { sendMessageWithSocket } from '../../socket';
import { fetchError, fetchSuccess, sendSuccess } from './actions';
import { MessagesActionTypes } from './types';

function* handleFetch(actionData: AnyAction) {
  try {
    const { chatId } = actionData.payload;
    const { data } = yield call(() => axios.get(`http://localhost:8000/message/all?chatId=${chatId}`));

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
    const { chatId, text, user, toUserId } = actionData.payload;
    const time = new Date().getTime();
    const { data } = yield call(() =>
      axios.post('http://localhost:8000/message/add', { chat: chatId, text, user, time },
    ));

    yield put(sendSuccess(data));
    sendMessageWithSocket(data, toUserId);
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* watchFetchRequest() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, handleFetch);
}

function* watchMessageSending() {
  yield takeEvery(MessagesActionTypes.SEND_MESSAGE, sendMessage);
}

function* messagesSaga() {
  yield all([fork(watchFetchRequest), fork(watchMessageSending)]);
}

export { messagesSaga };
