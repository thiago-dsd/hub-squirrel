import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
      await this.watchCampaign();
    };
  }

  private async watchCampaign(): Promise<void> {
    if (this.ws) {
      this.ws.onmessage = (event: MessageEvent) => {
        this.campaignSubject.next(event.data); 
      };
    }
  }

  async sendStatusRequest(): Promise<void> {
    if (this.ws) {
      this.ws.send('status');
    } else {
      console.error('WebSocket is not connected');
    }
  }

  async sendCampaign(): Promise<void> {
    if (this.ws) {
      this.ws.send('send');
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnectSocket() {
    this.campaignSubject.complete();
    if (this.ws) {
      this.ws.close();
    }
  }

  getCampaignSubject(): Observable<any> {
    return this.campaignSubject.asObservable();
  }
}
