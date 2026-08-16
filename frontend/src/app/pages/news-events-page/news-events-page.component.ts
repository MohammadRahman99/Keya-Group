import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyaDataService } from '../../services/keya-data.service';

@Component({
  selector: 'app-news-events-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">NEWS & EVENTS</h1>
          <p class="text-gray-600 text-sm mt-2">Latest press releases, corporate milestones, and industrial achievements from Keya Group.</p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article 
            *ngFor="let news of dataService.newsArticles" 
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div class="h-48 bg-gray-100 overflow-hidden relative">
                <img [src]="news.imageUrl" [alt]="news.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 left-3 bg-[#0170B9] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                  {{ news.category }}
                </span>
              </div>

              <div class="p-6">
                <div class="text-xs text-gray-400 font-semibold mb-2 flex items-center gap-1.5">
                  <i class="fa-regular fa-calendar text-[#0170B9]"></i>
                  {{ news.date }}
                </div>
                <h2 class="text-lg font-bold text-gray-900 mb-3 hover:text-[#0170B9] transition-colors leading-snug">
                  {{ news.title }}
                </h2>
                <p class="text-xs text-gray-600 leading-relaxed">
                  {{ news.summary }}
                </p>
              </div>
            </div>

            <div class="p-6 pt-0">
              <button (click)="openNewsModal(news)" class="text-xs font-bold text-[#0170B9] hover:underline uppercase tracking-wider flex items-center gap-1">
                Read Full Article <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </article>
        </div>

      </div>

      <!-- Article Modal -->
      <div *ngIf="selectedArticle" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" (click)="selectedArticle = null">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <button (click)="selectedArticle = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
          
          <div class="aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
            <img [src]="selectedArticle.imageUrl" [alt]="selectedArticle.title" class="w-full h-full object-cover" />
          </div>

          <div class="text-xs text-[#0170B9] font-bold uppercase tracking-wider mb-2">
            {{ selectedArticle.category }} • {{ selectedArticle.date }}
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedArticle.title }}</h2>
          <p class="text-sm text-gray-700 leading-relaxed mb-4">{{ selectedArticle.summary }}</p>
          <p class="text-sm text-gray-600 leading-relaxed">
            Keya Group continuously strives to champion eco-conscious manufacturing, export growth, and employee safety across Bangladesh and worldwide.
          </p>
        </div>
      </div>

    </div>
  `
})
export class NewsEventsPageComponent {
  dataService = inject(KeyaDataService);
  selectedArticle: any = null;

  openNewsModal(article: any) {
    this.selectedArticle = article;
  }
}
