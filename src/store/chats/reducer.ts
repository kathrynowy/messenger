import { Reducer } from 'redux';
import { ChatsActionTypes, ChatsState } from './types';

export const initialState: ChatsState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<ChatsState> = (state = initialState, action) => {
  switch (action.type) {
    case ChatsActionTypes.FETCH_CHATS: {
      return { ...state, loading: true };
    }
    case ChatsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case ChatsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as ChatsReducer };
