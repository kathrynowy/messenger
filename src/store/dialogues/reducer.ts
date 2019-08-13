import { Reducer } from 'redux';
import { DialoguesActionTypes, DialoguesState } from './types';

export const initialState: DialoguesState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<DialoguesState> = (state = initialState, action) => {
  switch (action.type) {
    case DialoguesActionTypes.FETCH_DIALOGUES: {
      return { ...state, loading: true };
    }
    case DialoguesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case DialoguesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as DialoguesReducer };
