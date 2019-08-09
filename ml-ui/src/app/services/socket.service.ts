import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';

const SERVER_URL = 'http://localhost:8888';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket;

    constructor() {
    }

    public initSocket(token): void {
      this.socket = socketIo(SERVER_URL, {
        query: 'token=' + token
      });
      this.listen('connect').subscribe( socket => console.log(`connected to socket`));
      this.listen('disconnect').subscribe(socket => console.log('disconnected'));
    }

    public listen<T>(event: string): Observable<T> {
      return fromEvent(this.socket, event);
    }

    public emit(event: string, payload: string) {
      console.log(this.socket);
      return this.socket.emit(event, payload);
    }
}
