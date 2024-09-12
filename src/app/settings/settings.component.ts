import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { ScreenType } from './settings-type.enum';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  currentScreen: ScreenType = ScreenType.UpdateProfile;
  ScreenType = ScreenType;
  
  constructor(
  ) {}

  ngOnInit(){}

  ngOnDestroy(){}

  switchScreen(screen: ScreenType) {
    this.currentScreen = screen;
  }

}
