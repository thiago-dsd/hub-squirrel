import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { environment } from '../../../enviroments/environment.development';
import axios, { AxiosInstance } from 'axios';
import { User } from '../entity/user.entity';
import { Subject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService implements OnInit {
  user: User | undefined;

  private readonly prefix: string = `${environment.apiUrl}/api/v1/user`;
  private http: AxiosInstance = axios.create(
    {
      baseURL: this.prefix,
      headers: {
        "Authorization": `Bearer ${this.authService.user?.refreshToken}`,
      }
    }
  );

  constructor(
    private readonly authService: AuthService,
  ) {
    this.authService.userObservable.subscribe(
      async (user) => {
        this.http = axios.create(
          {
            baseURL: this.prefix,
            headers: {
              "Authorization": `Bearer ${await user?.getIdToken()}`,
            }
          }
        );
      }
    );
  }

  async ngOnInit() {
    await this.me();
  }

  // Get user that made the request.
  public async me(
  ): Promise<User> {
    const { data: user } = await this.http.get(
      "/me"
    );
    this.user = user;
    return user;
  }

  // After first login, post first access.
  public async firstAccess(
    body: Partial<User> = {},
  ) {
    const { data: user } = await this.http.put(
      "/auth/first-access",
      body
    );
    this.user = user;
    return user;
  }
}
