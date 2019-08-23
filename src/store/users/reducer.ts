import { Reducer } from 'redux';
import { UsersActionTypes, UsersState } from './types';

export const initialState: UsersState = {
  currentUser: null,
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.GET_USER: {
      return { ...state, loading: true };
    }
    case UsersActionTypes.SIGN_IN: {
      return { ...state, loading: true };
    }
    case UsersActionTypes.SIGN_IN_SUCCESS: {
      return { ...state, loading: false, currentUser: action.payload };
    }
    case UsersActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case UsersActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as usersReducer };
