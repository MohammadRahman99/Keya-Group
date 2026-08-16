import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-csr-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <span class="text-emerald-600 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Corporate Social Responsibility
          </span>
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase mt-3">CSR & COMMUNITY IMPACT</h1>
          <p class="text-gray-600 text-sm mt-2 max-w-xl mx-auto">Keya Group is dedicated to uplifting society, preserving the environment, and supporting worker welfare.</p>
          <div class="w-16 h-1 bg-emerald-600 mx-auto rounded-full mt-4"></div>
        </div>

        <!-- 3 Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-6">
              <i class="fa-solid fa-leaf"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Environmental Sustainability</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              We employ biological effluent treatment plants (ETP) and rooftop solar energy to minimize carbon emissions and preserve natural water resources in Gazipur.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#0170B9] flex items-center justify-center text-xl mb-6">
              <i class="fa-solid fa-user-nurse"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Worker Health & Welfare</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Free medical care, free daycare facilities for working mothers, and fair living wage standards for all 15,000+ Keya Group family members.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-6">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Education & Community Care</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Supporting local schools, providing educational scholarships to workers' children, and distributing emergency food relief during natural calamities.
            </p>
          </div>

        </div>

        <!-- Banner Quote -->
        <div class="bg-gradient-to-r from-[#0170B9] to-blue-800 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-2xl font-bold mb-2">Committed to a Sustainable Future</h3>
            <p class="text-blue-100 text-sm max-w-xl">Every product created at Keya Group carries a pledge toward ecological integrity and human dignity.</p>
          </div>
          <a routerLink="/contact" class="bg-white text-[#0170B9] hover:bg-blue-50 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow transition-all flex-shrink-0">
            Partner With Us
          </a>
        </div>

      </div>
    </div>
  `
})
export class CsrPageComponent {}
