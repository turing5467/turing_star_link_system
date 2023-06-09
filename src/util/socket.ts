import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';

let io;
const jwt = new JwtService();
const socketMap = new Map();

export const connectIo = () => {
  io = new Server(3030, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    const jwtToken = socket.handshake.headers.authorization;
    if (jwtToken) {
      const userInfo: any = jwt.decode(jwtToken);
      if (userInfo) {
        socketMap.set(userInfo.userName, socket);
      }
    }
  });
  io.on('disconnect', (socket) => {
    // TODO:ws断开处理
    console.log('socket', socket);
  });
};

export const getUserSocket = (userName: string) => {
  return socketMap.get(userName);
};

export const broadcast = () => {
  // TODO:广播
};
