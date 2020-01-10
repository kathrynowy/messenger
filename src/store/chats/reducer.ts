import { Reducer } from 'redux';
import { Chat, ChatsActionTypes, ChatsState } from './types';


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
    case ChatsActionTypes.ADD_CHAT: {
      return { ...state, loading: true };
    }
    case ChatsActionTypes.ADD_CHAT_SUCCESS: {
      return { ...state, loading: false, data: [...state.data, action.payload] };
    }
    case ChatsActionTypes.CHANGE_LAST_MESSAGE: {
      const updatedChat = action.payload;
      const currentChat = state.data.find((chat: Chat) => chat._id === updatedChat._id);

      currentChat.lastMessageText = updatedChat.lastMessageText;
      currentChat.lastMessageTime = updatedChat.lastMessageTime;

      return { ...state, loading: false, data: state.data };
    }
    case ChatsActionTypes.CLEAR_UNREAD_MESSAGES: {
      const currentChat = state.data.find((chat: Chat) => chat._id === action.payload);
      currentChat.unreadMessages = 0;

      return { ...state, loading: false, data: state.data};
    }
    default: {
      return state;
    }
  }
};


export { reducer as ChatsReducer };
