import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { addChatSuccess, fetchError, fetchSuccess } from './actions';
import { ChatsActionTypes } from './types';


function* handleFetch(actionData: AnyAction) {
  try {
    const { userId } = actionData.payload;
    const { data } = yield call(() => axios.get(`chat/all?userId=${userId}`));

    yield put(fetchSuccess(data.reverse()));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* createChat(actionData: AnyAction) {
  try {
    const { data } = yield call(() => axios.post(`chat/add`, { usersId: actionData.payload }));

    yield put(addChatSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function *watchFetchRequest() {
  yield takeEvery(ChatsActionTypes.FETCH_CHATS, handleFetch);
}

function *watchChatCreating() {
  yield takeEvery(ChatsActionTypes.ADD_CHAT, createChat);
}

function* chatsSaga() {
  yield all([fork(watchFetchRequest), fork(watchChatCreating)]);
}

export { chatsSaga };
