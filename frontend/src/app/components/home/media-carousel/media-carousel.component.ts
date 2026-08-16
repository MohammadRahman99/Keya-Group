import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyaDataService } from '../../../services/keya-data.service';
import { CarouselSlide } from '../../../models/keya-data.model';

@Component({
  selector: 'app-media-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide">Factory & Product Gallery</h2>
            <p class="text-xs text-gray-500 mt-1">Glimpse into Keya Group's state-of-the-art manufacturing plants & product lineup</p>
          </div>

          <!-- Slider Nav Controls -->
          <div class="flex items-center space-x-2">
            <button 
              (click)="prevSlide()" 
              type="button"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0170B9] text-gray-700 hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous Slide"
            >
              <i class="fa-solid fa-chevron-left text-sm"></i>
            </button>
            <button 
              (click)="nextSlide()" 
              type="button"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0170B9] text-gray-700 hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next Slide"
            >
              <i class="fa-solid fa-chevron-right text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Slides Display Grid / Carousel -->
        <div class="relative">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500">
            <div 
              *ngFor="let slide of visibleSlides; let i = index" 
              class="group relative bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 aspect-[4/3]"
            >
              <img 
                [src]="slide.imageUrl" 
                [alt]="slide.title" 
                class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span class="inline-block bg-[#0170B9] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded w-max mb-1">
                  {{ slide.tag }}
                </span>
                <h4 class="text-white font-semibold text-sm drop-shadow-sm">
                  {{ slide.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center items-center space-x-2 mt-8">
          <button 
            *ngFor="let idx of totalPagesArray; let pageIdx = index"
            (click)="goToPage(pageIdx)"
            type="button"
            [class]="pageIdx === currentPage ? 'w-8 h-2.5 bg-[#0170B9] rounded-full' : 'w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-gray-400'"
            class="transition-all duration-300"
            [attr.aria-label]="'Go to page ' + (pageIdx + 1)"
          ></button>
        </div>

      </div>
    </section>
  `
})
export class MediaCarouselComponent implements OnInit, OnDestroy {
  dataService = inject(KeyaDataService);
  slides: CarouselSlide[] = [];
  currentPage = 0;
  itemsPerPage = 4;
  autoPlayInterval: any;

  ngOnInit() {
    this.slides = this.dataService.carouselSlides;
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  get totalPages(): number {
    return Math.ceil(this.slides.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0);
  }

  get visibleSlides(): CarouselSlide[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.slides.slice(start, start + this.itemsPerPage);
  }

  nextSlide() {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
  }

  prevSlide() {
    this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
  }

  goToPage(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}
