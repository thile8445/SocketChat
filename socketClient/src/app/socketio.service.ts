import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketIOClient } from 'socket.io-client';
import { Observable } from 'rxjs';
import { messege } from './messege';
@Injectable()
export class SocketIOService {
  socket: SocketIOClient.Socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log('connected');
    });
  }
  onNewMessage(data: messege) {
    let value ;
    this.socket.emit('events', data);
    this.socket.on('events', (data) => console.log(data),value = data);
    return value;
  }
  socketEmit() {
    console.log('emit');
    this.socket.emit('hello', { name: 'emit', age: 12 }, (data) =>
      console.log(data)
    );
  }
  socketObserverble() {
    console.log('emit observerble');
    this.socket.emit('pipe', { name: 'Nest' });
    this.socket.on('pipe', (data) => console.log(data));
  }
  chat(data:messege){
    this.socket.emit('chat',data);
    this.socket.on('chat', (data) => console.log(data));
  }
}
