import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class CampaignWebsocketService {
  private campaignSubject = new Subject<any>();
  private ws: WebSocket | undefined;

  constructor() {}

  connect(campaignId: string) {
    this.ws = new WebSocket(`wss://wppmanager.server.newschool.app/websocket/campaign/whatsapp/send/${campaignId}?Authorization=${'Bearer ' + (localStorage.getItem('token') || '')}`);
    this.ws.onopen = async () => {
      await this.sendStatusRequest();
    };
    this.ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
  }

  private async sendStatusRequest() : Promise<void> {
    this.campaignSubject.next({ type: 'status' });
  }

  private async sendCampaign() : Promise<void> {
    this.campaignSubject.next({ type: 'send' });
  }

  disconnectSocket() {
    this.campaignSubject.complete();
    if(this.ws){
      this.ws.close();
    }
  }
}
