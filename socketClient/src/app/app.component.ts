import { Component, OnInit, OnChanges } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketIOService } from './socketio.service';
import { messege } from './messege';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name :string = '';
  data :messege[] = [];
  constructor(private socketIoService: SocketIOService) {}
  ngOnInit() {
    this.socketIoService.setupSocketConnection();
    this.name = prompt('Enter your username:');
  }
  GetMessege(data : messege) {
    let re = this.socketIoService.chat(data);
    return re;
  }
  GetEmit() {
    this.socketIoService.socketEmit();
  }
  GetObserverble() {
    this.socketIoService.socketObserverble();
  }
  sendMessge(event){
    const da :  messege ={
      name : this.name,
      room : 'a',
      messege : event.target.value,
    }
    this.GetMessege(da);
     this.data.push(da);
    // console.log(this.data);
  }
}
