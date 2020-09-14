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
  // onNewMessage(data: Messenger) {
  //   let value ;
  //   this.socket.emit('events', data);
  //   this.socket.on('events', (data) => console.log(data),value = data);
  //   return value;
  // }
  // socketEmit() {
  //   console.log('emit');
  //   this.socket.emit('hello', { name: 'emit', age: 12 }, (data) =>
  //     console.log(data)
  //   );
  // }
  // socketObservable() {
  //   console.log('emit observable');
  //   this.socket.emit('pipe', { name: 'Nest' });
  //   this.socket.on('pipe', (data) => console.log(data));
  // }
  chat(data: Messenger) {
    this.socket.emit('chatToServer', data);
    // this.socket.on('chatToClient', (data) => {
    //   console.log('data ' + JSON.stringify(data)), this.receiveChat(data);
    // });
  }
  chatClient(){
    this.socket.on('chatToClient', (data) => {
      console.log('data ' + JSON.stringify(data)), this.receiveChat(data);
    });
  }
  receiveChat(msg) {
    this.data.push(msg);
  }
  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }
}
