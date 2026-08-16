import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSectionComponent } from '../../components/home/contact-section/contact-section.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactSectionComponent],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">GET IN TOUCH</h1>
          <p class="text-gray-600 text-sm mt-2">Reach out to Keya Group corporate headquarters in Gazipur for inquiries & global export partnerships.</p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Contact Section -->
        <app-contact-section></app-contact-section>

        <!-- Google Map Frame -->
        <div class="mt-12 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
          <h3 class="text-lg font-bold text-gray-900 mb-4 px-2 flex items-center gap-2">
            <i class="fa-solid fa-map-location-dot text-[#0170B9]"></i> Factory Location (Gazipur, Bangladesh)
          </h3>
          <div class="w-full h-96 rounded-xl overflow-hidden bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14581.332306282875!2d90.312948!3d24.001602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c3c049b49b2f%3A0xb30e84b8026194b7!2sKonabari%2C%20Gazipur!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
              class="w-full h-full border-0" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ContactPageComponent {}
