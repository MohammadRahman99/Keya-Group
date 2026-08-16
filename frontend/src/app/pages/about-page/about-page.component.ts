import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KeyaDataService } from '../../services/keya-data.service';
import { Division } from '../../models/keya-data.model';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Breadcrumb -->
        <div class="mb-8">
          <nav class="flex text-xs font-semibold uppercase tracking-wider text-gray-500 gap-2">
            <a routerLink="/" class="hover:text-[#0170B9]">Home</a>
            <span>/</span>
            <span class="text-[#0170B9]">About Keya Group</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            {{ selectedDivision ? selectedDivision.name : 'About Keya Group' }}
          </h1>
          <p class="text-gray-600 text-sm mt-1">
            {{ selectedDivision ? selectedDivision.subtitle : 'Leading Conglomerate in Bangladesh & Global Textiles Exporter' }}
          </p>
        </div>

        <!-- Division Detail or Overview Grid -->
        <div *ngIf="selectedDivision; else generalAbout">
          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div class="rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-100">
                <img [src]="selectedDivision.imageUrl" [alt]="selectedDivision.name" class="w-full h-full object-cover" />
              </div>

              <div>
                <span class="inline-block bg-[#0170B9] text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  {{ selectedDivision.category === 'textiles' ? 'RMG & Textiles Division' : 'Cosmetics & Toiletries' }}
                </span>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedDivision.name }}</h2>
                <p class="text-gray-700 leading-relaxed text-sm mb-6">{{ selectedDivision.description }}</p>
                
                <h3 class="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider">Key Division Highlights:</h3>
                <ul class="space-y-2">
                  <li *ngFor="let feat of selectedDivision.keyFeatures" class="flex items-center gap-2 text-sm text-gray-700">
                    <i class="fa-solid fa-circle-check text-[#0170B9]"></i>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Back link -->
            <div class="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <a routerLink="/about" class="text-sm font-semibold text-[#0170B9] hover:underline flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> View All Divisions
              </a>
              <a routerLink="/contact" class="bg-[#0170B9] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow hover:bg-[#005894] transition-all">
                Inquire With Division
              </a>
            </div>
          </div>
        </div>

        <!-- General About View -->
        <ng-template #generalAbout>
          <div class="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-md mb-12">
            <div class="max-w-3xl">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Pioneering Industry Excellence Since 1996</h2>
              <p class="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                Keya Group is one of Bangladesh's premier industrial groups with over two decades of manufacturing mastery across Textiles, Garments, Cosmetics, Yarn Spinning, Cotton processing, and Agro-processing.
              </p>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                With modern production facilities located in Gazipur, Bangladesh, Keya Group exports high-quality knitwear and yarn to top global markets in Europe, the United States, Australia, and Southeast Asia, while providing essential personal care products to millions of homes daily.
              </p>
            </div>
          </div>

          <!-- All Business Units Grid -->
          <h2 class="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Keya Group Business Units</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div *ngFor="let div of dataService.divisions" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="h-44 bg-gray-100 overflow-hidden relative">
                  <img [src]="div.imageUrl" [alt]="div.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span class="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                    {{ div.subtitle }}
                  </span>
                </div>
                <div class="p-6">
                  <h3 class="font-bold text-lg text-gray-900 mb-2">{{ div.name }}</h3>
                  <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed">{{ div.description }}</p>
                </div>
              </div>

              <div class="p-6 pt-0">
                <a [routerLink]="['/about', div.slug]" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#0170B9] hover:underline uppercase tracking-wider">
                  Read Division Profile <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </ng-template>

      </div>
    </div>
  `
})
export class AboutPageComponent implements OnInit {
  dataService = inject(KeyaDataService);
  route = inject(ActivatedRoute);
  selectedDivision?: Division;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.selectedDivision = this.dataService.getDivisionBySlug(slug);
      } else {
        this.selectedDivision = undefined;
      }
    });
  }
}
