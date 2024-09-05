import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ContactControllerService } from './controller/contacts-controller.service';
import { MessagingProduct } from './entity/messaging-product.entity';
import { CommonModule } from '@angular/common';
import { Conversation } from './entity/conversation.entity';
import { Message } from './entity/messsage.entity';
import { SendMessage } from './entity/send-message.entity';
import { WebsocketService } from './websocket/websocket-controller.service';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  someError: boolean = false;
  emailAndPassWordError: boolean = false;
  isLoading: boolean = false;
  pageSize = 10;
  offset = 0; // Começamos do offset 0
  hasMoreConversations = true; // Controle se ainda há mais conversas para carregar
  messagingProducts: MessagingProduct[] = [];
  conversations: Conversation[] = [];
  currentConversation: Conversation | null = null;
  conversationHistory: Message[] = [];
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('conversationsContainer') private conversationsContainer!: ElementRef;
  private wsSubscription: Subscription | undefined;

  constructor(
    private readonly auth: ContactControllerService,
    private readonly webSocketService: WebsocketService,
  ) {}

  ngOnInit() {
    this.getConversations();

    this.wsSubscription = this.webSocketService.getMessageSubject().subscribe(
      (message: Message) => {
        console.log('Nova mensagem recebida via WebSocket: ', message);
          this.conversationHistory.push(message);
          this.scrollToBottom();
      },
      (error) => {
        console.error('Erro no WebSocket: ', error);
      }
    );    
  }

  ngOnDestroy() {
    this.webSocketService.disconnectSocket();
  }

  async allMessagingProducts() {
    this.resetError();
    this.isLoading = true;

    try {
      const response = await this.auth.getMessagingProducts();
      this.messagingProducts = response;
    } catch (error) {
      console.error('ContactsComponent.allMessagingProducts()', error);
    } finally {
      this.isLoading = false;
    }
  }

  async getConversations(offset = 0) {
    this.resetError();
    this.isLoading = true;

    try {
      const response = await this.auth.getConversations(offset, this.pageSize);
      
      if(offset === 0){
        this.conversations = response;
      } else {
        this.conversations = [...this.conversations, ...response];
      }

      if(response.length < this.pageSize){
        this.hasMoreConversations = false;
      }
    } catch (error) {
      console.error('ContactsComponent.getConversations()', error);
    } finally {
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    this.conversationsContainer.nativeElement.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = this.conversationsContainer.nativeElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.onScrollDown();
      }
    });
  }

  onScrollDown() {
    if (this.hasMoreConversations) {
      this.offset += this.pageSize; // Atualiza o offset
      this.getConversations(this.offset); // Carrega a próxima página
    }
  }

  async getConversationHistory(selectedConversation: Conversation) {
    this.resetError();
    this.isLoading = true;

    try {
      this.currentConversation = selectedConversation;
      const idToUse =
        selectedConversation.from_id === '00000000-0000-0000-0000-000000000000'
          ? selectedConversation.to_id
          : selectedConversation.from_id;

      const response = await this.auth.getConversationHistory(idToUse);
      console.log('conversationHistory in components.ts = ', response.length);
      this.conversationHistory = response;
      this.scrollToBottom();
    } catch (error) {
      console.error('ContactsComponent.getConversationHistory()', error);
    } finally {
      this.isLoading = false;
    }
  }

  async sendMessage(messageInput: string) {
    this.resetError();
    this.isLoading = true;

    try {
      const message: SendMessage = {
        sender_data: {
          messaging_product: 'whatsapp',
          text: {
            body: messageInput,
            preview_url: true,
          },
          to: this.currentConversation?.product_data?.from ?? '',
          type: 'text',
        },
        to_id: this.currentConversation?.from_id ?? '',
      };

      const response = await this.auth.sendMessage(message);
      const aux = this.currentConversation ? await this.getConversationHistory(this.currentConversation) : null;

    } catch (error) {
      console.error('ContactsComponent.sendMessage()', error);
    } finally {
      this.isLoading = false;
    }
  }

  resetError() {
    this.someError = false;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private scrollToBottom(): void {
      setTimeout(() => {
        // Auto scrolling.
        this.chatContainer.nativeElement.scroll({
            top: this.chatContainer.nativeElement.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    });
  }
}
