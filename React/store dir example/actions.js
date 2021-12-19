import {
  GET_DATA,
  GET_DATA_FAIL,
  GET_DATA_SUCCESS,
} from "./actionTypes"

export const getData = () => ({
  type: GET_DATA,
})

export const getDataSuccess = data => ({
  type: GET_DATA_SUCCESS,
  payload: data,
})

export const getDataFail = error => ({
  type: GET_DATA_FAIL,
  payload: error,
})




