import { Reducer } from "redux";
import { MessagesActionTypes, MessagesState } from "./types";

export const initialState: MessagesState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<MessagesState> = (state = initialState, action) => {
  switch (action.type) {
    case MessagesActionTypes.FETCH_MESSAGES: {
      return { ...state, loading: true };
    }
    case MessagesActionTypes.SEND_MESSAGE: {
      return { ...state, loading: true };
    }
    case MessagesActionTypes.SEND_SUCCESS: {
      return { ...state, loading: false, data: [...state.data, action.payload]};
    }
    case MessagesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case MessagesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as MessagesReducer };
