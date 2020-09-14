import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { platform } from 'os';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server ,Socket} from 'socket.io';
import { Messenger } from './messenger';


@WebSocketGateway()
export class EventGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('hello')
  handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ): string {
    console.log('hello ' + payload.name);
    return 'Hello world!';
  }
  @SubscribeMessage('pipe')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('observable' + data.name);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'pipe', data: item })));
  }
  @SubscribeMessage('test')
  handleTest(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'test';
    return { event, data };
  }
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any): WsResponse<any> {
    console.log('server' + data.name);
    const event = 'events'; 
    return { event, data };
  }
  @SubscribeMessage('chatToServer')
  handChat(client : Socket ,payload :Messenger){
    console.log(payload);
    try { 
			this.server.in(payload.room).clients((error, clients) => {
				if (error) throw error;
				console.log(clients); 
			});
		} catch(err) {
			console.log(err);
		}
    this.server.to(payload.room).emit('chatToClient',payload);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client : Socket ,room :string){
    client.join(room);
  }
}
