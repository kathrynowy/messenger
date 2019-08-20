import io from 'socket.io-client';
import { Message } from 'src/store/messages/types';
import { sendSuccess } from '../store/messages/actions';

const socket = io('http://localhost:8000');

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
