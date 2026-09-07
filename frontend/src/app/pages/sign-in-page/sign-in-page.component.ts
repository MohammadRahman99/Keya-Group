import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#0170B9]/20 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
        
        <!-- Top Keya Group Header Branding -->
        <div class="bg-gray-900 p-8 text-center text-white relative overflow-hidden">
          <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-[#0170B9]/20 rounded-full blur-2xl"></div>
          
          <img 
            src="https://keyagroupbd.com/wp-content/uploads/2020/12/Keya-Group-Logo-.png" 
            alt="Keya Group Logo" 
            class="h-12 mx-auto mb-4 bg-white/90 p-2 rounded-xl shadow-lg"
          />
          <h2 class="text-xl font-extrabold uppercase tracking-wide">STAFF PORTAL SIGN-IN</h2>
          <p class="text-xs text-gray-400 mt-1">Authorized Internal Employee & Admin Sign-In Portal</p>
        </div>

        <div class="p-8">
          
          <!-- Error Alert -->
          <div *ngIf="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation text-base"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Login Form -->
          <form (ngSubmit)="onLogin()" class="space-y-5 text-xs">
            <div>
              <label class="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Official Email Address</label>
              <div class="relative">
                <i class="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  type="email" 
                  [(ngModel)]="email" 
                  name="userEmail" 
                  required 
                  placeholder="e.g. admin&#64;keyagroup.com" 
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#0170B9] focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label class="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Account Password</label>
              <div class="relative">
                <i class="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  type="password" 
                  [(ngModel)]="password" 
                  name="userPassword" 
                  required 
                  placeholder="••••••••" 
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#0170B9] focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              [disabled]="!email || !password || isLoading"
              class="w-full bg-[#0170B9] hover:bg-[#005894] disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span *ngIf="!isLoading"><i class="fa-solid fa-right-to-bracket mr-1"></i> Sign In to Dashboard</span>
              <span *ngIf="isLoading" class="flex items-center gap-2">
                <i class="fa-solid fa-circle-notch animate-spin"></i> Authenticating...
              </span>
            </button>
          </form>

          <!-- Quick Demo Logins Section -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center mb-3">
              One-Click Demo Fill Credentials
            </span>
            <div class="grid grid-cols-3 gap-2">
              <button 
                type="button"
                (click)="fillDemo('admin@keyagroup.com', 'Admin123!')" 
                class="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 py-2 rounded-lg text-[10px] font-bold transition-all text-center"
              >
                <i class="fa-solid fa-user-shield block text-sm mb-0.5"></i> Admin
              </button>

              <button 
                type="button"
                (click)="fillDemo('pm@keyagroup.com', 'Pm123!')" 
                class="bg-blue-50 hover:bg-blue-100 text-[#0170B9] border border-blue-200 py-2 rounded-lg text-[10px] font-bold transition-all text-center"
              >
                <i class="fa-solid fa-boxes-packing block text-sm mb-0.5"></i> Manager
              </button>

              <button 
                type="button"
                (click)="fillDemo('operator@keyagroup.com', 'Operator')" 
                class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2 rounded-lg text-[10px] font-bold transition-all text-center"
              >
                <i class="fa-solid fa-headset block text-sm mb-0.5"></i> Operator
              </button>
            </div>
          </div>

          <div class="mt-6 text-center">
            <a routerLink="/" class="text-xs text-gray-500 hover:text-[#0170B9] font-bold transition-colors">
              <i class="fa-solid fa-arrow-left mr-1"></i> Back to Public Website
            </a>
          </div>

        </div>

      </div>

    </div>
  `
})
export class SignInPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  fillDemo(demoEmail: string, demoPass: string) {
    this.email = demoEmail;
    this.password = demoPass;
    this.errorMessage = '';
  }

  onLogin() {
    if (!this.email || !this.password) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid staff email or password. Please try again.';
      }
    });
  }
}
