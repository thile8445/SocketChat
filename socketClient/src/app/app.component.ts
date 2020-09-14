import { Component, OnInit } from '@angular/core';
import { SocketIOService } from './socketio.service';
import { Messenger } from './messenger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name: string = '';
  data: Messenger[] = [];
  room :string = 'aRoom';
  constructor(private socketIoService: SocketIOService) {}
  ngOnInit() {
    this.socketIoService.setupSocketConnection();
    this.name = prompt('Enter your username:');
    this.socketIoService.joinRoom(this.room);
    this.socketIoService.chatClient();
  }
  sendMessage(event) {
    const da: Messenger = {
      name: this.name,
      room: this.room,
      messenger: event.target.value,
    };
    this.socketIoService.chat(da);
    // this.socketIoService.chatClient();
    this.data = this.socketIoService.data;
  }
}
