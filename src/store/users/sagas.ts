import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ChatsActionTypes } from '../chats/types';
import { fetchChats } from './../chats/actions';
import { fetchError, fetchSuccess, signInSuccess } from './actions';
import { UsersActionTypes } from './types';

function* handleFetch() {
  try {
    const res = [{
      chats : ['5d308fccf3d6a151f00b9bfe'],
      userId: 2,
      username: 'Katya',
    }];

    yield put(fetchSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* signIn(actionData: AnyAction) {
  try {
    const { username, password, history } = actionData.payload;
    const { data } = yield call(() => axios.post('http://localhost:8000/auth/login', {username, password}));

    if (data.token && data.id) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
    }

    yield put(fetchChats({ userId: data.id }));
    history.push('/');
    yield put(signInSuccess(data));
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* watchFetchRequest() {
  yield takeEvery(UsersActionTypes.FETCH_REQUEST, handleFetch);
}

function* watchSignInRequest() {
  yield takeEvery(UsersActionTypes.SIGN_IN, signIn);
}

function* usersSaga() {
  yield all([fork(watchFetchRequest), fork(watchSignInRequest)]);
}

export { usersSaga };
