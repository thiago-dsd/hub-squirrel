import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  constructor(private readonly authService: AuthService) {}

  async authenticate() {
    const email = 'thiago@newschool.app';
    const password = 'broxa';
    
    try {
      const response = await this.authService.login(email, password);
      console.log('Authenticated successfully', response);
      // Aqui você pode salvar os tokens ou fazer outras operações
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
}
