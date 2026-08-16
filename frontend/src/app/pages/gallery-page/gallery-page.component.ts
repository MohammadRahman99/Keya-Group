import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { KeyaDataService } from '../../services/keya-data.service';
import { CarouselSlide } from '../../models/keya-data.model';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">KEYA MEDIA GALLERY</h1>
          <p class="text-gray-600 text-sm mt-2">Explore high-resolution media from Keya Group production units & corporate facilities.</p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Gallery Tabs -->
        <div class="flex justify-center gap-4 mb-10">
          <button 
            (click)="activeTab = 'photo'" 
            [class]="activeTab === 'photo' ? 'bg-[#0170B9] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'"
            class="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-image"></i> Photo Gallery
          </button>

          <button 
            (click)="activeTab = 'video'" 
            [class]="activeTab === 'video' ? 'bg-[#FF0000] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'"
            class="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-video"></i> Video Gallery
          </button>
        </div>

        <!-- Photo Gallery Content -->
        <div *ngIf="activeTab === 'photo'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            *ngFor="let item of photos" 
            (click)="openLightbox(item)"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100 aspect-[4/3] relative"
          >
            <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <span class="text-xs font-bold text-white uppercase tracking-wider">{{ item.tag }}</span>
              <h3 class="text-sm font-semibold text-white/90">{{ item.title }}</h3>
            </div>
          </div>
        </div>

        <!-- Video Gallery Content -->
        <div *ngIf="activeTab === 'video'" class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fa-brands fa-youtube text-red-600"></i> Keya Group Official Documentary
            </h2>
            
            <div class="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe 
                [src]="safeVideoUrl" 
                title="Keya Group Official Video" 
                class="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
            
            <div class="mt-4 text-xs text-gray-500 flex items-center justify-between">
              <span>Official Video Presentation</span>
              <a href="https://www.youtube.com/watch?v=ly3uYm7GGO4" target="_blank" class="text-[#0170B9] font-bold hover:underline">
                Watch on YouTube <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Lightbox Modal -->
      <div *ngIf="lightboxSlide" class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" (click)="lightboxSlide = null">
        <div class="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl" (click)="$event.stopPropagation()">
          <button (click)="lightboxSlide = null" class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <img [src]="lightboxSlide.imageUrl" [alt]="lightboxSlide.title" class="w-full max-h-[80vh] object-contain" />
          <div class="p-4 bg-gray-900 text-white flex justify-between items-center text-sm">
            <span class="font-bold">{{ lightboxSlide.title }}</span>
            <span class="text-xs bg-[#0170B9] px-2.5 py-1 rounded font-semibold">{{ lightboxSlide.tag }}</span>
          </div>
        </div>
      </div>

    </div>
  `
})
export class GalleryPageComponent implements OnInit {
  dataService = inject(KeyaDataService);
  sanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);

  activeTab: 'photo' | 'video' = 'photo';
  photos: CarouselSlide[] = [];
  lightboxSlide: CarouselSlide | null = null;
  safeVideoUrl!: SafeResourceUrl;

  ngOnInit() {
    this.photos = this.dataService.carouselSlides;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dataService.officialVideoUrl);

    this.route.params.subscribe(params => {
      if (params['type'] === 'video') {
        this.activeTab = 'video';
      } else {
        this.activeTab = 'photo';
      }
    });
  }

  openLightbox(slide: CarouselSlide) {
    this.lightboxSlide = slide;
  }
}
