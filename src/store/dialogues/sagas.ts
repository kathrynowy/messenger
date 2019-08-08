import axios from "axios";
import { AnyAction } from "redux";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { fetchError, fetchSuccess } from "./actions";
import { DialoguesActionTypes } from "./types";
/* import { callApi } from '../../utils/api' */

function* handleFetch(actionData: AnyAction) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const { userId } = actionData.payload;
    const { data } = yield call(() => axios.get(`http://localhost:8000/dialogue/all?userId=${userId}`));
   /*  if (res.error) {
      yield put(fetchError(res.error))
    } else { */
    yield put(fetchSuccess(data));
    /* } */
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError("An unknown error occured."));
    }
  }
}

function *watchFetchRequest() {
  yield takeEvery(DialoguesActionTypes.FETCH_DIALOGUES, handleFetch);
}

function* dialoguesSaga() {
  yield all([fork(watchFetchRequest)]);
}

export { dialoguesSaga };
