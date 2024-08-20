import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.local';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  private readonly prefix: string = `${environment.apiUrl}`;
  private http: AxiosInstance = axios.create(
    {
      baseURL: this.prefix,
    }
  );
  

  public async login() : Promise<Token> {
    const email = 'thiago@newschool.app';
    const password = 'broxa';
  
    try {
      const { data: token} = await this.http.post('/user/auth/token', { email, password });

      console.log('Token:', token.token);
      console.log('Refresh Token:', token.refresh_token);
      
      return token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  
}
