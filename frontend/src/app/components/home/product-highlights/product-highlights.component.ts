import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-highlights',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-16 bg-gray-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide uppercase">OUR PRODUCTS</h2>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-3"></div>
        </div>

        <!-- 2 Grid Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <!-- Card 1: Cosmetics & Toiletries -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
            <div class="relative overflow-hidden bg-gray-100 aspect-video md:aspect-[4/3]">
              <img 
                src="https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg" 
                alt="Cosmetics & Toiletries" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3 bg-[#0170B9] text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                Personal Hygiene
              </div>
            </div>
            
            <div class="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#0170B9] transition-colors">
                  Cosmetics & Toiletries
                </h3>
                <p class="text-sm text-gray-600 mt-2">
                  Household beauty soaps, skincare petroleum jelly, toothpaste, and laundry detergent powders.
                </p>
              </div>

              <div class="mt-6">
                <a 
                  routerLink="/our-products" 
                  [queryParams]="{category: 'cosmetics'}"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-[#0170B9] hover:text-[#005894]"
                >
                  Explore Collection <i class="fa-solid fa-chevron-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Card 2: RMG & Textiles -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
            <div class="relative overflow-hidden bg-gray-100 aspect-video md:aspect-[4/3]">
              <img 
                src="https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg" 
                alt="RMG & Textiles" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                Garments & Yarns
              </div>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  RMG & Textiles
                </h3>
                <p class="text-sm text-gray-600 mt-2">
                  Knit composite garments, polo shirts, high-grade combed yarn, and raw cotton carding.
                </p>
              </div>

              <div class="mt-6">
                <a 
                  routerLink="/our-products" 
                  [queryParams]="{category: 'textiles'}"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Explore Collection <i class="fa-solid fa-chevron-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- View All Products CTA -->
        <div class="text-center mt-12">
          <a 
            routerLink="/our-products" 
            class="inline-flex items-center gap-2 bg-[#0170B9] hover:bg-[#005894] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            View All Products
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>

      </div>
    </section>
  `
})
export class ProductHighlightsComponent {}
