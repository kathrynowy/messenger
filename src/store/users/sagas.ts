import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchChats } from './../chats/actions';
import { fetchError, fetchSuccess, signInSuccess } from './actions';
import { UsersActionTypes } from './types';


function* signIn(actionData: AnyAction) {
  try {
    const { username, password, history } = actionData.payload;
    const { data } = yield call(() => axios.post('auth/login', { username, password }));

    if (data.token && data.id) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
    }

    yield put(fetchChats({ userId: data.id }));
    history.push('/main');
    yield put(signInSuccess(data));
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* signUp(actionData: AnyAction) {
  try {
    const { username, password } = actionData.payload;
    const { data } = yield call(() => axios.post('auth/signup', { username, password }));

    console.log('💥new user: ', data.username);
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* getUsers() {
  try {
    const { data } = yield call(() => axios.get('user/all'));

    console.log('💥users: ', data);
    yield put(fetchSuccess(data));
  } catch (err) {
    yield put(fetchError(err.stack!));
  }
}

function* watchSignInRequest() {
  yield takeEvery(UsersActionTypes.SIGN_IN, signIn);
}

function* watchGetUsersRequest() {
  yield takeEvery(UsersActionTypes.GET_USERS, getUsers);
}

function* watchSignUpRequest() {
  yield takeEvery(UsersActionTypes.SIGN_UP, signUp);
}

function* usersSaga() {
  yield all([fork(watchSignInRequest), fork(watchSignUpRequest), fork(watchGetUsersRequest)]);
}


export { usersSaga };
