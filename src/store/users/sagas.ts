import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchChats } from './../chats/actions';
import { fetchError, signInSuccess } from './actions';
import { UsersActionTypes } from './types';

function* signIn(actionData: AnyAction) {
  try {
    const { username, password, history } = actionData.payload;
    const { data } = yield call(() => axios.post('http://localhost:8000/auth/login', { username, password }));

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

function* signUp(actionData: AnyAction) {
  try {
    const { username, password } = actionData.payload;
    const { data } = yield call(() => axios.post('http://localhost:8000/auth/signup', { username, password }));

    console.log('💥new user: ', data.username);
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* watchSignInRequest() {
  yield takeEvery(UsersActionTypes.SIGN_IN, signIn);
}

function* watchSignUpRequest() {
  yield takeEvery(UsersActionTypes.SIGN_UP, signUp);
}

function* usersSaga() {
  yield all([fork(watchSignInRequest), fork(watchSignUpRequest)]);
}

export { usersSaga };
