import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-16 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Left Column: Office Address -->
          <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 tracking-wide mb-6 pb-3 border-b-2 border-[#0170B9]">
                Office Address
              </h2>

              <ul class="space-y-6">
                <!-- Phone -->
                <li class="flex items-start gap-4">
                  <div class="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0170B9] text-lg flex-shrink-0">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div>
                    <span class="text-xs uppercase font-bold text-gray-400 block tracking-wider">Phone Helpline</span>
                    <a href="tel:+8801722099200" class="text-base font-semibold text-gray-800 hover:text-[#0170B9] transition-colors">
                      +8801722099200
                    </a>
                  </div>
                </li>

                <!-- Email -->
                <li class="flex items-start gap-4">
                  <div class="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0170B9] text-lg flex-shrink-0">
                    <i class="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <span class="text-xs uppercase font-bold text-gray-400 block tracking-wider">Email Address</span>
                    <a href="mailto:info&#64;keya-bd.com" class="text-base font-semibold text-gray-800 hover:text-[#0170B9] transition-colors">
                      info&#64;keya-bd.com
                    </a>
                  </div>
                </li>

                <!-- Building Address -->
                <li class="flex items-start gap-4">
                  <div class="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0170B9] text-lg flex-shrink-0">
                    <i class="fa-solid fa-building"></i>
                  </div>
                  <div>
                    <span class="text-xs uppercase font-bold text-gray-400 block tracking-wider">Headquarters</span>
                    <p class="text-base font-semibold text-gray-800 leading-snug">
                      Keya Group Corporate Complex<br />
                      <span class="text-sm font-normal text-gray-600">Jarun, Konabari, Gazipur, Bangladesh</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Business Hours Card -->
            <div class="mt-8 pt-6 border-t border-gray-200/80 text-xs text-gray-500 flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-clock text-[#0170B9]"></i>
                Saturday – Thursday: 9:00 AM – 6:00 PM
              </span>
              <span class="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Open</span>
            </div>

          </div>

          <!-- Right Column: Contact Us Form -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-md">
            <h2 class="text-2xl font-bold text-gray-900 tracking-wide mb-6 pb-3 border-b-2 border-[#0170B9]">
              Contact Us
            </h2>

            <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-5">
              
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                  Your Full Name <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  [(ngModel)]="formData.name" 
                  required
                  placeholder="Enter your name"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0170B9] focus:border-[#0170B9] text-sm text-gray-800 transition-all outline-none"
                />
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  [(ngModel)]="formData.email" 
                  required
                  email
                  placeholder="name&#64;example.com"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0170B9] focus:border-[#0170B9] text-sm text-gray-800 transition-all outline-none"
                />
              </div>

              <!-- Message Input -->
              <div>
                <label for="message" class="block text-xs uppercase font-bold text-gray-600 mb-1.5">
                  Message <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4" 
                  [(ngModel)]="formData.message" 
                  required
                  placeholder="Write your message or inquiry here..."
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0170B9] focus:border-[#0170B9] text-sm text-gray-800 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                [disabled]="!contactForm.form.valid || isSubmitting"
                class="w-full bg-[#0170B9] hover:bg-[#005894] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span *ngIf="!isSubmitting">Send Message</span>
                <span *ngIf="isSubmitting" class="flex items-center gap-2">
                  <i class="fa-solid fa-circle-notch animate-spin"></i> Sending...
                </span>
              </button>

            </form>

            <!-- Success Alert Modal / Notification -->
            <div *ngIf="submittedSuccess" class="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-3 animate-fade-in">
              <i class="fa-solid fa-circle-check text-emerald-600 text-lg flex-shrink-0"></i>
              <div>
                <strong class="font-bold block">Thank you! Your message has been sent.</strong>
                Our team at Keya Group will review your query and respond shortly.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactSectionComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  submittedSuccess = false;

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.submittedSuccess = true;
      this.formData = { name: '', email: '', message: '' };
      
      setTimeout(() => {
        this.submittedSuccess = false;
      }, 6000);
    }, 1000);
  }
}
