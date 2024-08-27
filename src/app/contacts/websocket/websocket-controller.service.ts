import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Message } from '../entity/messsage.entity';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  messageSubject = new Subject<Message>();

  constructor() {}

  connectSocket(): boolean {
    try {
      this.messageSubject = webSocket("wppmanager.server.newschool.app/message/new");
      console.log("Websocket conectado com sucesso")
    } catch {
      return false;
    }
    return true;
  }

  disconnectSocket() {
    this.messageSubject.complete();
  }
}