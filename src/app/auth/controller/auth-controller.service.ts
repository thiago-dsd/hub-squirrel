import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: environment.apiUrl,
    });
  }

  async login(email: string, password: string) {
    try {
      const { data } = await this.http.post('/user/auth/token', { email, password });
      console.log('Token:', data.token);
      console.log('Refresh Token:', data.refresh_token);
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}
