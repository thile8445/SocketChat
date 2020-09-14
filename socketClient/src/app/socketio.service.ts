import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketIOClient } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Messenger } from './messenger';
import { JsonPipe } from '@angular/common';

@Injectable()
export class SocketIOService {
  socket: SocketIOClient.Socket;
  constructor() {}
  data: Messenger[] = [];
  count = 0;
  setupSocketConnection() {
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log('connected');
    });
  }
  chat(data: Messenger) {
    this.socket.emit('chatToServer', data);
  }
  chatClient() {
    this.socket.on('chatToClient', (data) => {
      this.receiveChat(data);
    });
  }
  receiveChat(msg) {
    this.data.push(msg);
  }
  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }
}
