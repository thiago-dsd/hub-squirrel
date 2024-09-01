import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selectedPage: string = '';

  constructor(private router: Router) {
    this.updateSelectedPage(window.location.pathname);
  }

  navigateTo(page: string) {
    this.selectedPage = page;
    this.router.navigate([`/${page}`]);
  }

  updateSelectedPage(path: string) {
    const page = path.split('/').pop() || '';
    this.selectedPage = page;
  }
}
