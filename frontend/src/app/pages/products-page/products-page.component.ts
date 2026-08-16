import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeyaDataService } from '../../services/keya-data.service';
import { KeyaProduct } from '../../models/keya-data.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="mb-10 text-center">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">OUR PRODUCTS</h1>
          <p class="text-gray-600 text-sm mt-2 max-w-xl mx-auto">
            Discover Keya Group's wide range of premium cosmetics, personal care products, and global RMG textile knitwear.
          </p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Filter Controls -->
        <div class="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-2 w-full md:w-auto">
            <button 
              (click)="setCategory('all')" 
              [class]="selectedCategory === 'all' ? 'bg-[#0170B9] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              All Products
            </button>
            <button 
              (click)="setCategory('cosmetics')" 
              [class]="selectedCategory === 'cosmetics' ? 'bg-[#0170B9] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              Cosmetics & Toiletries
            </button>
            <button 
              (click)="setCategory('textiles')" 
              [class]="selectedCategory === 'textiles' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              RMG & Textiles
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative w-full md:w-72">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              placeholder="Search products..." 
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0170B9]"
            />
          </div>

        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            *ngFor="let item of filteredProducts" 
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
          >
            <div>
              <div class="relative bg-gray-100 aspect-square overflow-hidden">
                <img 
                  [src]="item.imageUrl" 
                  [alt]="item.name" 
                  class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span 
                  *ngIf="item.badge" 
                  class="absolute top-3 left-3 bg-[#0170B9] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider"
                >
                  {{ item.badge }}
                </span>
              </div>

              <div class="p-5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  {{ item.categoryLabel }}
                </span>
                <h3 class="font-bold text-base text-gray-900 group-hover:text-[#0170B9] transition-colors mb-2">
                  {{ item.name }}
                </h3>
                <p class="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {{ item.description }}
                </p>
                <div *ngIf="item.weightOrSize" class="mt-3 text-[11px] font-semibold text-gray-500">
                  <i class="fa-solid fa-tag text-[#0170B9] mr-1"></i> {{ item.weightOrSize }}
                </div>
              </div>
            </div>

            <div class="p-5 pt-0">
              <button 
                (click)="openModal(item)"
                class="w-full bg-gray-100 hover:bg-[#0170B9] hover:text-white text-gray-800 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <i class="fa-solid fa-eye"></i> View Details
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="filteredProducts.length === 0" class="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100 my-8">
          <i class="fa-solid fa-box-open text-4xl text-gray-300 mb-3 block"></i>
          <p class="font-semibold text-gray-700">No products match your search filter.</p>
          <button (click)="resetFilters()" class="mt-4 text-xs font-bold text-[#0170B9] hover:underline uppercase tracking-wider">
            Reset Filters
          </button>
        </div>

      </div>

      <!-- Product Modal Lightbox -->
      <div *ngIf="activeModalProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100">
          <button 
            (click)="activeModalProduct = null" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
            <img [src]="activeModalProduct.imageUrl" [alt]="activeModalProduct.name" class="w-full h-full object-cover" />
          </div>

          <span class="inline-block bg-blue-50 text-[#0170B9] text-[11px] font-bold px-3 py-1 rounded-full uppercase mb-2">
            {{ activeModalProduct.categoryLabel }}
          </span>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ activeModalProduct.name }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ activeModalProduct.description }}</p>

          <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span *ngIf="activeModalProduct.weightOrSize" class="text-xs font-semibold text-gray-500">
              Spec: {{ activeModalProduct.weightOrSize }}
            </span>
            <a routerLink="/contact" (click)="activeModalProduct = null" class="bg-[#0170B9] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#005894] transition-all">
              Inquire Wholesale
            </a>
          </div>
        </div>
      </div>

    </div>
  `
})
export class ProductsPageComponent implements OnInit {
  dataService = inject(KeyaDataService);
  route = inject(ActivatedRoute);

  selectedCategory = 'all';
  searchQuery = '';
  activeModalProduct: KeyaProduct | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });
  }

  get filteredProducts(): KeyaProduct[] {
    let list = this.dataService.getProductsByCategory(this.selectedCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  resetFilters() {
    this.selectedCategory = 'all';
    this.searchQuery = '';
  }

  openModal(product: KeyaProduct) {
    this.activeModalProduct = product;
  }
}
