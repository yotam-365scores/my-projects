import { GET_DATA_SUCCESS, GET_DATA_FAIL } from "./actionTypes";

import { initialState } from "./model";

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_SUCCESS: {
      console.log("GET_DATA_SUCCESS {state = INIT_STATE, action}", {
        state,
        action,
      });
      return {
        ...state,
        data: action.payload,
      };
    }

    case GET_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default: {
      //return state;
    }
  }
};

export default Reducer;
