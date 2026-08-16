import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KeyaDataService } from '../../../services/keya-data.service';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 md:py-20 border-b border-gray-100 overflow-hidden">
      
      <!-- Background subtle pattern -->
      <div class="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#0170B9_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-12 transition-all hover:shadow-2xl">
          
          <!-- Keya Group Header Emblem -->
          <div class="text-center mb-10">
            <h2 class="text-xs uppercase tracking-widest text-[#0170B9] font-bold mb-3">Enterprise Divisions</h2>
            <img 
              [src]="dataService.logoUrl" 
              alt="Keya Group Emblem" 
              class="h-16 md:h-20 mx-auto object-contain mb-4 hover:scale-105 transition-transform"
            />
            <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full"></div>
          </div>

          <!-- Two Columns Division Menu -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            
            <!-- Column 1: RMG & TEXTILES -->
            <div class="pt-4 md:pt-0 md:pr-6">
              <div class="flex items-center gap-3 mb-6 pb-2 border-b-2 border-[#0170B9]">
                <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0170B9]">
                  <i class="fa-solid fa-shirt"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 tracking-wide uppercase">RMG & TEXTILES</h3>
              </div>

              <ul class="space-y-3 font-semibold text-sm">
                <li>
                  <a routerLink="/about/keya-knit-composite" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>KNIT COMPOSITE DIVISION</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-spinning-mills" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>SPINNING DIVISION</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-cotton-mills" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>COTTON DIVISION</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-yarn-mills-ltd" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>KEYA YARN MILLS</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-europe" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>KEYA EUROPE</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-usa" class="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0170B9] transition-all group">
                    <span>KEYA USA</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Column 2: COSMETICS, TOILETRIES & OTHERS -->
            <div class="pt-6 md:pt-0 md:pl-6">
              <div class="flex items-center gap-3 mb-6 pb-2 border-b-2 border-emerald-500">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <i class="fa-solid fa-pump-soap"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 tracking-wide uppercase">COSMETICS & TOILETRIES</h3>
              </div>

              <ul class="space-y-3 font-semibold text-sm">
                <li>
                  <a routerLink="/about/keya-cosmetics-ltd" class="flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all group">
                    <span>KEYA COSMETICS LTD.</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
                <li>
                  <a routerLink="/about/keya-agro-process-ltd" class="flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all group">
                    <span>KEYA AGRO PROCESS LTD.</span>
                    <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                  </a>
                </li>
              </ul>

              <!-- Division Info Badge Box -->
              <div class="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-xs text-gray-600 leading-relaxed">
                <div class="flex items-start gap-2">
                  <i class="fa-solid fa-award text-[#0170B9] text-base mt-0.5"></i>
                  <div>
                    <strong class="text-gray-900 block font-semibold mb-0.5">National Heritage & Quality</strong>
                    Over 20+ years of excellence supplying household cosmetics and knit composite garments worldwide.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class HeroBannerComponent {
  dataService = inject(KeyaDataService);
}
