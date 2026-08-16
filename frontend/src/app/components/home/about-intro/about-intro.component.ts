import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-14 bg-white border-b border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <!-- Quote / Intro Container -->
        <div class="relative bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <i class="fa-solid fa-quote-left text-4xl text-[#0170B9]/20 absolute top-4 left-6"></i>
          
          <p class="text-lg md:text-xl text-gray-700 italic font-serif leading-relaxed max-w-3xl mx-auto relative z-10">
            "Keya Group is one of the well-known fellowships of Bangladesh. The Group has more than 20 years of national & global experience. KG has started to spread its footprints outside Bangladesh, especially in the Europe, Australia, China, Southeast Asia, USA through exporting its various products."
          </p>
          
          <i class="fa-solid fa-quote-right text-4xl text-[#0170B9]/20 absolute bottom-4 right-6"></i>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
            <div class="text-2xl md:text-3xl font-extrabold text-[#0170B9]">20+</div>
            <div class="text-xs uppercase font-bold text-gray-600 tracking-wider mt-1">Years Experience</div>
          </div>

          <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
            <div class="text-2xl md:text-3xl font-extrabold text-[#0170B9]">50M+</div>
            <div class="text-xs uppercase font-bold text-gray-600 tracking-wider mt-1">Annual Capacity</div>
          </div>

          <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
            <div class="text-2xl md:text-3xl font-extrabold text-[#0170B9]">15,000+</div>
            <div class="text-xs uppercase font-bold text-gray-600 tracking-wider mt-1">Workforce</div>
          </div>

          <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
            <div class="text-2xl md:text-3xl font-extrabold text-[#0170B9]">Global</div>
            <div class="text-xs uppercase font-bold text-gray-600 tracking-wider mt-1">Export Network</div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutIntroComponent {}
