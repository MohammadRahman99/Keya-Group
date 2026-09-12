import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col justify-between bg-white selection:bg-[#0170B9] selection:text-white">
      <!-- Public Header Navbar (Hidden on Admin & Sign-In Routes) -->
      <app-header *ngIf="!isAdminOrAuthRoute()"></app-header>
      
      <div class="flex-grow">
        <router-outlet></router-outlet>
      </div>

      <!-- Public Footer (Hidden on Admin & Sign-In Routes) -->
      <app-footer *ngIf="!isAdminOrAuthRoute()"></app-footer>
    </div>
  `
})
export class AppComponent {
  title = 'Keya Group';
  private router = inject(Router);

  isAdminOrAuthRoute(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/admin') || currentUrl.includes('/sign-in');
  }
}
