import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeyaDataService } from '../../services/keya-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="flex items-center gap-2 group">
              <img 
                [src]="dataService.headerLogoUrl" 
                alt="Keya Group Logo" 
                class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1 font-medium text-[15px]">
            <!-- Home -->
            <a 
              routerLink="/" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]" 
              [routerLinkActiveOptions]="{exact: true}"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              Home
            </a>

            <!-- About Dropdown -->
            <div class="relative group py-6" (mouseenter)="showAboutMenu = true" (mouseleave)="showAboutMenu = false">
              <button 
                routerLink="/about"
                routerLinkActive="text-[#0170B9]"
                class="flex items-center gap-1 px-3 text-gray-700 hover:text-[#0170B9] transition-colors focus:outline-none"
              >
                About
                <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                [class.opacity-100]="showAboutMenu"
                [class.visible]="showAboutMenu"
                [class.opacity-0]="!showAboutMenu"
                [class.invisible]="!showAboutMenu"
                class="absolute left-0 top-full w-64 bg-white border-t-2 border-[#0170B9] shadow-xl rounded-b-md py-2 transition-all duration-200 z-50"
              >
                <a routerLink="/about/keya-cosmetics-ltd" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Cosmetics Ltd</a>
                <a routerLink="/about/keya-knit-composite" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Knit Composite</a>
                <a routerLink="/about/keya-spinning-mills" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Spinning Mills</a>
                <a routerLink="/about/keya-cotton-mills" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Cotton Mills</a>
                <a routerLink="/about/keya-yarn-mills-ltd" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Yarn Mills Ltd</a>
                <a routerLink="/about/keya-agro-process-ltd" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya Agro Process Ltd</a>
                <a routerLink="/about/keya-usa" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Keya USA</a>
                <a routerLink="/about/keya-europe" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all">Keya Europe</a>
              </div>
            </div>

            <!-- Our Products -->
            <a 
              routerLink="/our-products" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              Our Products
            </a>

            <!-- Gallery Dropdown -->
            <div class="relative group py-6" (mouseenter)="showGalleryMenu = true" (mouseleave)="showGalleryMenu = false">
              <button 
                routerLink="/gallery"
                routerLinkActive="text-[#0170B9]"
                class="flex items-center gap-1 px-3 text-gray-700 hover:text-[#0170B9] transition-colors focus:outline-none"
              >
                Gallery
                <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              
              <!-- Gallery Dropdown Menu -->
              <div 
                [class.opacity-100]="showGalleryMenu"
                [class.visible]="showGalleryMenu"
                [class.opacity-0]="!showGalleryMenu"
                [class.invisible]="!showGalleryMenu"
                class="absolute left-0 top-full w-48 bg-white border-t-2 border-[#0170B9] shadow-xl rounded-b-md py-2 transition-all duration-200 z-50"
              >
                <a routerLink="/gallery/photo" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all border-b border-gray-100">Photo Gallery</a>
                <a routerLink="/gallery/video" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0170B9] hover:pl-6 transition-all">Video Gallery</a>
              </div>
            </div>

            <!-- News & Events -->
            <a 
              routerLink="/news-events" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              News & Events
            </a>

            <!-- CSR -->
            <a 
              routerLink="/csr" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              CSR
            </a>

            <!-- Career -->
            <a 
              routerLink="/career" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              Career
            </a>

            <!-- Contact -->
            <a 
              routerLink="/contact" 
              routerLinkActive="text-[#0170B9] font-semibold border-b-2 border-[#0170B9]"
              class="px-3 py-6 text-gray-700 hover:text-[#0170B9] transition-colors"
            >
              Contact
            </a>
          </nav>

          <!-- Mobile Hamburger Button -->
          <div class="lg:hidden">
            <button 
              (click)="toggleMobileMenu()" 
              type="button" 
              class="p-2.5 text-gray-700 hover:text-[#0170B9] focus:outline-none"
              aria-label="Toggle menu"
            >
              <i [class]="isMobileMenuOpen ? 'fa-solid fa-xmark text-2xl' : 'fa-solid fa-bars text-2xl'"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div 
        *ngIf="isMobileMenuOpen" 
        class="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-fade-in"
      >
        <a 
          routerLink="/" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          Home
        </a>

        <!-- Mobile About Accordion -->
        <div>
          <button 
            (click)="mobileAboutOpen = !mobileAboutOpen"
            class="flex items-center justify-between w-full px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
          >
            <span>About</span>
            <i [class]="mobileAboutOpen ? 'fa-solid fa-chevron-up text-xs' : 'fa-solid fa-chevron-down text-xs'"></i>
          </button>
          
          <div *ngIf="mobileAboutOpen" class="pl-5 space-y-1 py-1 bg-gray-50/50 rounded-md border-l-2 border-[#0170B9] my-1">
            <a routerLink="/about/keya-cosmetics-ltd" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Cosmetics Ltd</a>
            <a routerLink="/about/keya-knit-composite" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Knit Composite</a>
            <a routerLink="/about/keya-spinning-mills" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Spinning Mills</a>
            <a routerLink="/about/keya-cotton-mills" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Cotton Mills</a>
            <a routerLink="/about/keya-yarn-mills-ltd" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Yarn Mills Ltd</a>
            <a routerLink="/about/keya-agro-process-ltd" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Agro Process Ltd</a>
            <a routerLink="/about/keya-usa" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya USA</a>
            <a routerLink="/about/keya-europe" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Keya Europe</a>
          </div>
        </div>

        <a 
          routerLink="/our-products" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          Our Products
        </a>

        <!-- Mobile Gallery Accordion -->
        <div>
          <button 
            (click)="mobileGalleryOpen = !mobileGalleryOpen"
            class="flex items-center justify-between w-full px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
          >
            <span>Gallery</span>
            <i [class]="mobileGalleryOpen ? 'fa-solid fa-chevron-up text-xs' : 'fa-solid fa-chevron-down text-xs'"></i>
          </button>
          
          <div *ngIf="mobileGalleryOpen" class="pl-5 space-y-1 py-1 bg-gray-50/50 rounded-md border-l-2 border-[#0170B9] my-1">
            <a routerLink="/gallery/photo" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Photo Gallery</a>
            <a routerLink="/gallery/video" (click)="closeMobileMenu()" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#0170B9]">Video Gallery</a>
          </div>
        </div>

        <a 
          routerLink="/news-events" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          News & Events
        </a>

        <a 
          routerLink="/csr" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          CSR
        </a>

        <a 
          routerLink="/career" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          Career
        </a>

        <a 
          routerLink="/contact" 
          (click)="closeMobileMenu()"
          class="block px-3 py-2.5 font-medium text-gray-800 hover:text-[#0170B9] hover:bg-gray-50 rounded-md"
        >
          Contact
        </a>
      </div>
    </header>
  `
})
export class HeaderComponent {
  dataService = inject(KeyaDataService);
  
  showAboutMenu = false;
  showGalleryMenu = false;
  isMobileMenuOpen = false;
  mobileAboutOpen = false;
  mobileGalleryOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.mobileAboutOpen = false;
    this.mobileGalleryOpen = false;
  }
}
