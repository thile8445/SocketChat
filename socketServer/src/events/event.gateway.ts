import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Socket } from 'dgram';
import { messege } from './messege';

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
    console.log('observerble' + data.name);
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
  @SubscribeMessage('chat')
  handChat(client : Socket ,payload :messege){
    console.log(payload);
    this.server.emit('chat',payload);
  }
}
