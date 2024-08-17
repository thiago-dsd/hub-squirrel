import { Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshGatewayService {
  private uri?: string;

  public socket?: Socket;
  public auth: AuthService;

  constructor(
    auth: AuthService,
  ) {
    this.auth = auth;
  }

  public setUri(
    uri: string,
  ) {
    this.uri = uri;
  }

  async init() {
    await this.setSocket();

    this.watchToken();
  }

  public async refreshToken(
    token: string,
  ): Promise<boolean> {
    return await (this.socket as Socket).emitWithAck(
      "token/refresh",
      token,
    );
  }

  private async setSocket() {
    console.log("defining socket")
    this.socket = io(
      this.uri as string,
      {
        transports: ['websocket'],
        auth: {
          "Authorization": `Bearer ${await this.auth.user?.getIdToken()}`,
        }
      }
    );
    console.log("socket defined")
  }

  private watchToken() {
    console.log("watching token.");

    this.auth.idTokenObservable.subscribe(
      async token => {
        console.log("refreshing token with bearer");
        const bearer = `Bearer ${token}`;

        console.log(bearer);

        (this.socket as Socket).auth = {
          "Authorization": bearer,
        };

        await this.refreshToken(bearer);
        console.log("refreshed token.");
      }
    )
  }
}
