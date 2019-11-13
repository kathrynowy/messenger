import io from 'socket.io-client';
import { baseUrl } from '../config';
import { sendSuccess } from '../store/messages/actions';
import { Message } from '../store/messages/types';


const socket = io(baseUrl);

const configureSocket = (store: any) => {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('RECEIVE_MESSAGE', (message: Message) => {
    store.dispatch(sendSuccess(message));
  });

  return socket;
};


export const sendMessageWithSocket = (message: Message, toUserId: string) => {
  socket.emit('SEND_MESSAGE', { message, toUserId });
};

export const sendUserId = (userId: string) => {
  socket.emit('SEND_USER_ID', userId);
};

export { configureSocket };
