import { takeEvery, put, call } from "redux-saga/effects"

// Chat Redux States
import {
  GET_DATA,
} from "./actionTypes"
import {
  getDataSuccess,
  getDataFail,
} from "./actions"

import {
  get,
} from "../../../helpers/api_helper";

function* onGetData() {
  try {
    const response = yield call(() => get("/api/path/to/data-api"));
    yield put(getDataSuccess(response.data))
  } catch (error) {
    yield put(getDataFail(error))
  }
}


function* Saga() {
  yield takeEvery(GET_DATA, onGetData)
}

export default Saga
