import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from '../entity/messsage.entity';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  messageSubject = new Subject<Message>();
  ws: WebSocket = new WebSocket(
    `ws://wppmanager.server.newschool.app/websocket/message/new?Authorization=${'Bearer ' + (localStorage.getItem('token') || '')}`,
  );

  constructor() {
    this.ws.onopen = async () => {
      await Promise.all([this.watchMessages()]);
      // Pegar as mensagens atuais da conversa antes
    };
  }

  disconnectSocket() {
    this.messageSubject.complete();
  }

  async watchMessages(): Promise<void> {
    this.ws.onmessage = (data: any) => {
      console.log('WebsocketService.watchMessages()', data);
    };
  }
}
