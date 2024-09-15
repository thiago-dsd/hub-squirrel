import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { ScreenType } from './settings-type.enum';
import { User } from './entity/user.entity';
import { SettingsControllerService } from './controller/settings-controller.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MenuComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  // Screens
  currentScreen: ScreenType = ScreenType.UpdateProfile;
  ScreenType = ScreenType;

  // Loading and erros
  isLoading: boolean = false;
  error: string | null = null;
  
  // Users
  selectedUser: User | null = null;
  currentUser: User | null = null;
  allUsers: User[] = [];

  // User creation form fields
  newUser: Partial<User> = {}

  

  
  constructor(
    private readonly api: SettingsControllerService,
  ) {}

  ngOnInit(){
    this.getCurrentUser();
  }

  ngOnDestroy(){}

  switchScreen(screen: ScreenType) {
    this.currentScreen = screen;
  }


  async createUser() {
    this.error = "";
    this.isLoading = true;

    try {
      if(this.newUser.email && this.newUser.name && this.newUser.password){
        const response = await this.api.postCreateUser(this.newUser.email, this.newUser.name, this.newUser.password);
      } else {
        this.error = "Por favor, preencha todos os campo para criar um usuário.";
      }
    } catch (error) {
      console.error('ContactsComponent.sendMessage()', error);
      this.error = "Ocorreu um erro. Tente novamente.";
    } finally {
      this.isLoading = false;
    }
  }

  async getCurrentUser() {
    this.error = "";
    this.isLoading = true;

    try {
      this.currentUser = await this.api.getCurrentUser();
    } catch (error) {
      console.error('ContactsComponent.getCurrentUser()', error);
      this.error = "Ocorreu um erro. Tente novamente.";
    } finally {
      this.isLoading = false;
    }
  }
  
  get userEmail(): string {
    return this.currentUser?.email || '';
  }

  set userEmail(value: string) {
    if (this.currentUser) {
      this.currentUser.email = value;
    }
  }

  get userPassword(): string {
    return this.currentUser?.password || '';
  }

  set userPassword(value: string) {
    if (this.currentUser) {
      this.currentUser.password = value;
    }
  }

  get userName(): string {
    return this.currentUser?.name || '';
  }

  set userName(value: string) {
    if (this.currentUser) {
      this.currentUser.name = value;
    }
  }

  async updateCurrentUser(){
    this.error = "";
    this.isLoading = true;

    try {
      if (this.currentUser) {
        this.currentUser.email = this.userEmail;
        this.currentUser.password = this.userPassword;
        this.currentUser.name = this.userName;
        const response = await this.api.putUpdateCurrentUser(this.currentUser);  
      } else {
        this.error = "Ocorreu um erro. Por favor, reinicie o website."
      }
    } catch (error) {
      console.error('ContactsComponent.updateCurrentUser()', error);
      this.error = "Ocorreu um erro. Tente novamente.";
    } finally {
      this.isLoading = false;
    }
  }
}
