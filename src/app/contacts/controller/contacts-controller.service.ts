import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Token } from '@angular/compiler';
import { MessagingProduct } from '../entity/messaging-product.entity';

@Injectable({
  providedIn: 'root',
})
export class ContactControllerService {
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
  

  public async  getMessagingProducts(
    ) : Promise<MessagingProduct[]> {  
    try {
      const { data: messagingProducts} = await this.http.get('messaging-product', {
        params: {
          limit: 10, // Número máximo de registros por página
        }
      });

    // Impressão da lista completa de produtos
    console.log('Lista completa de Messaging Products:', messagingProducts);

    

      return messagingProducts;
    } catch (error) {
      console.error('ContactsController.getMessagingProducts', error);
      throw error;
    }
  }
  
}
