import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from '../entity/messsage.entity';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  messageSubject = new Subject<Message>();
  ws: WebSocket = new WebSocket(
    `ws://wppmanager.server.newschool.app/websocket/message/new?${'Bearer ' + (localStorage.getItem('token') || '')}`,
  );

  constructor() {
    this.ws.onopen = async () => {
      await Promise.all([this.watchMessages()]);
      // Pegar as mensagens atuais da conversa antes
    };
  }

  connectSocket(): boolean {
    try {
      console.log('Websocket conectado com sucesso');
    } catch {
      return false;
    }
    return true;
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
