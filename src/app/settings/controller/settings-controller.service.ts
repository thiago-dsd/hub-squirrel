import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Token } from '@angular/compiler';
import { User } from '../entity/user.entity';

@Injectable({
  providedIn: 'root',
})
export class SettingsControllerService {
  private readonly prefix: string = `${environment.apiUrl}`;
  private http: AxiosInstance = axios.create(
    {
      baseURL: this.prefix,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  
  public async  getUsersPaginated(offset = 0, limit = 10) : Promise<User[]> {  
    try {
      const { data: usersPaginated} = await this.http.get('/user', {
        params: {
          limit: limit,
          offset: offset,
          created_at: 'desc',
        }
      });
      return usersPaginated;
    } catch (error) {
      console.error('SettingsController.getUsersPaginated', error);
      throw error;
    }
  }

  public async  getCurrentUser() : Promise<User> {  
    try {
      const { data: currentUser} = await this.http.get('/user/me');
      return currentUser;
    } catch (error) {
      console.error('SettingsController.getCurrentUser', error);
      throw error;
    }
  }

  public async putUpdateUserById(email: string, id: string, name: string) {  
    try {
      const { data: currentUser} = await this.http.put('/user', {
        data: {
          "email": email,
          "id": id,
          "name": name
        }
      });
    } catch (error) {
      console.error('SettingsController.putUpdateUserById', error);
      throw error;
    }
  }

  public async putUpdateCurrentUser(currentUser: User) {  
    try {
      const { data: currentUser} = await this.http.get('/user');
    } catch (error) {
      console.error('SettingsController.putUpdateCurrentUser', error);
      throw error;
    }
  }

  public async deleteCurrentUser() {  
    try {
      const { data: userDeleted} = await this.http.delete('/user/me');
    } catch (error) {
      console.error('SettingsController.deleteCurrentUser', error);
      throw error;
    }
  }

  public async deleteUserById(userId: string) {  
    try {
      const { data: userDeleted} = await this.http.delete('/user', {
        data: {"id": userId}
      });
    } catch (error) {
      console.error('SettingsController.deleteUserById', error);
      throw error;
    }
  }

  public async postCreateUser(email: string, name: string, password: string) {  
    try {
      const { data: createdUser} = await this.http.post('/user/me', {
        data: {
          "email": email,
          "name": name,
          "password": password
        }
      });
    } catch (error) {
      console.error('SettingsController.postCreateUser', error);
      throw error;
    }
  }
}
