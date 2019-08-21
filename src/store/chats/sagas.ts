import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchError, fetchSuccess } from './actions';
import { ChatsActionTypes } from './types';

function* handleFetch(actionData: AnyAction) {
  try {
    const { userId } = actionData.payload;
    const { data } = yield call(() => axios.get(`http://localhost:8000/chat/all?userId=${userId}`));

    yield put(fetchSuccess(data));
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

function* chatsSaga() {
  yield all([fork(watchFetchRequest)]);
}

export { chatsSaga };
