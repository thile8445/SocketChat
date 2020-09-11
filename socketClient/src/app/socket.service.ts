import { Injectable } from "@angular/core";

@Injectable()

export class SocketService{
  socket ;
  constructor(){}

  setUpSocket(){
    this.socket = new WebSocket('ws://localhost:3000');
    this.socket.onopen = function() {
      console.log('Connected1');
      this.socket.send(
        JSON.stringify({
          event: 'events',
        }),
      );

      this.socket.onmessage = function(data) {
        // this.vlu = data.data
        console.log(data.data);
      };
    };
  }
}
