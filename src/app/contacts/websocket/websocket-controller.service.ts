import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../entity/messsage.entity';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private messageSubject = new Subject<Message>();
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(
      `wss://wppmanager.server.newschool.app/websocket/message/new?Authorization=${'Bearer ' + (localStorage.getItem('token') || '')}`
    );

    this.ws.onopen = async () => {
      await this.watchMessages();
    };
  }

  disconnectSocket() {
    this.messageSubject.complete();
    this.ws.close();
  }

  private async watchMessages(): Promise<void> {
    this.ws.onmessage = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data); // Assume que os dados recebidos são JSON
      console.log('WebsocketService.watchMessages()', message);
      this.messageSubject.next(message); // Envia a mensagem para os inscritos
    };
  }

  getMessageSubject(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
