import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  private readonly prefix: string = `${environment.apiUrl}`;
  private http: AxiosInstance = axios.create(
    {
      baseURL: this.prefix,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    }
  );
  

  public async login(
    email: string,
    password: string,
  ) : Promise<Token> {
    // login - Test
    // const email = 'thiago@newschool.app';
    // const password = 'broxa';
  
    try {
      const { data: token} = await this.http.post('user/auth/token', { email, password });


      localStorage.setItem("token", token.token);
      localStorage.setItem("refreshToken", token.newRefreshToken);

      console.log('Token:', token.token);
      console.log('Refresh Token:', token.refresh_token);
      
      return token;
    } catch (error) {
      console.error('AuthController.login', error);
      throw error;
    }
  }
  
}
