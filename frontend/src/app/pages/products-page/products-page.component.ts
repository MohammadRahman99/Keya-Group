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
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">OUR PRODUCTS & PRICING</h1>
          <p class="text-gray-600 text-sm mt-2 max-w-xl mx-auto">
            Discover Keya Group's wide range of premium cosmetics, personal care products, and global RMG textile knitwear with wholesale pricing.
          </p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Filter Controls -->
        <div class="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-2 w-full md:w-auto">
            <button 
              (click)="setCategory('all')" 
              [class]="selectedCategory === 'all' ? 'bg-[#0170B9] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              All Products
            </button>
            <button 
              (click)="setCategory('cosmetics')" 
              [class]="selectedCategory === 'cosmetics' ? 'bg-[#0170B9] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              Cosmetics & Toiletries
            </button>
            <button 
              (click)="setCategory('textiles')" 
              [class]="selectedCategory === 'textiles' ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
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
              (input)="applySearchFilter()"
              placeholder="Search products..." 
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0170B9]"
            />
          </div>

        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-16">
          <i class="fa-solid fa-circle-notch animate-spin text-3xl text-[#0170B9] mb-3"></i>
          <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Loading products catalogue & pricing...</p>
        </div>

        <!-- Products Grid -->
        <div *ngIf="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            *ngFor="let item of filteredProducts" 
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
          >
            <div>
              <div class="relative bg-gray-100 aspect-square overflow-hidden cursor-pointer" (click)="openModal(item)">
                <img 
                  [src]="item.imageUrl" 
                  [alt]="item.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <!-- Badge Top Left -->
                <span 
                  *ngIf="item.badge" 
                  class="absolute top-3 left-3 bg-[#0170B9] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider"
                >
                  {{ item.badge }}
                </span>

                <!-- Price Badge Bottom Right -->
                <span 
                  *ngIf="item.priceFormatted || item.price" 
                  class="absolute bottom-3 right-3 bg-gray-900/90 text-amber-400 backdrop-blur-sm text-xs font-black px-3 py-1 rounded-lg shadow-lg border border-amber-400/30"
                >
                  {{ item.priceFormatted || ('৳ ' + item.price) }}
                </span>
              </div>

              <div class="p-5">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    {{ item.categoryLabel }}
                  </span>
                  <span *ngIf="item.priceFormatted" class="text-xs font-black text-emerald-600">
                    {{ item.priceFormatted }}
                  </span>
                </div>

                <h3 (click)="openModal(item)" class="font-bold text-base text-gray-900 group-hover:text-[#0170B9] transition-colors mb-2 cursor-pointer">
                  {{ item.name }}
                </h3>

                <p class="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {{ item.description }}
                </p>

                <div *ngIf="item.weightOrSize" class="mt-3 text-[11px] font-semibold text-gray-500">
                  <i class="fa-solid fa-tag text-[#0170B9] mr-1"></i> Spec: {{ item.weightOrSize }}
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 space-y-2">
              <!-- Inquire Purchase Button -->
              <button 
                (click)="openPurchaseQueryModal(item)"
                class="w-full bg-[#0170B9] hover:bg-[#005894] text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <i class="fa-solid fa-cart-flatbed"></i> Inquire Purchase / Send Quote
              </button>

              <button 
                (click)="openModal(item)"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <i class="fa-solid fa-circle-info"></i> View Details & High-Res Image
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!isLoading && filteredProducts.length === 0" class="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100 my-8">
          <i class="fa-solid fa-box-open text-4xl text-gray-300 mb-3 block"></i>
          <p class="font-semibold text-gray-700">No products match your search filter.</p>
          <button (click)="resetFilters()" class="mt-4 text-xs font-bold text-[#0170B9] hover:underline uppercase tracking-wider">
            Reset Filters
          </button>
        </div>

      </div>

      <!-- High-Res Product Details Lightbox Modal -->
      <div *ngIf="activeModalProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
          <button 
            (click)="activeModalProduct = null" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- High-Res Image Container -->
            <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
              <img [src]="activeModalProduct.imageUrl" [alt]="activeModalProduct.name" class="w-full h-full object-cover" />
              
              <span *ngIf="activeModalProduct.badge" class="absolute top-3 left-3 bg-[#0170B9] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {{ activeModalProduct.badge }}
              </span>

              <span *ngIf="activeModalProduct.priceFormatted || activeModalProduct.price" class="absolute bottom-3 right-3 bg-gray-900 text-amber-400 text-xs font-black px-3.5 py-1.5 rounded-lg shadow-lg border border-amber-400/40">
                {{ activeModalProduct.priceFormatted || ('৳ ' + activeModalProduct.price) }}
              </span>
            </div>

            <!-- Details Information -->
            <div class="flex flex-col justify-between">
              <div>
                <span class="inline-block bg-blue-50 text-[#0170B9] text-[11px] font-bold px-3 py-1 rounded-full uppercase mb-2">
                  {{ activeModalProduct.categoryLabel }}
                </span>

                <h2 class="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {{ activeModalProduct.name }}
                </h2>

                <div *ngIf="activeModalProduct.priceFormatted" class="text-base font-black text-emerald-600 mb-3">
                  <i class="fa-solid fa-tag mr-1"></i> {{ activeModalProduct.priceFormatted }}
                </div>

                <p class="text-xs text-gray-600 leading-relaxed mb-4">
                  {{ activeModalProduct.description }}
                </p>

                <div *ngIf="activeModalProduct.weightOrSize" class="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4 text-xs font-medium text-gray-700">
                  <span class="font-bold text-gray-900 block mb-0.5">Specification / Package Unit:</span>
                  {{ activeModalProduct.weightOrSize }}
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100 space-y-2">
                <button 
                  (click)="openPurchaseQueryModal(activeModalProduct); activeModalProduct = null" 
                  class="w-full bg-[#0170B9] hover:bg-[#005894] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <i class="fa-solid fa-cart-flatbed"></i> Inquire Purchase / Send Order Quote to Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Purchase Quote Request Modal -->
      <div *ngIf="showPurchaseModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
          <button 
            (click)="showPurchaseModal = false" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#0170B9] flex items-center justify-center text-lg font-bold">
              <i class="fa-solid fa-file-signature"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 leading-tight">Product Purchase Inquiry</h3>
              <span class="text-xs text-gray-500">Target Product: <strong class="text-[#0170B9]">{{ targetProduct?.name }}</strong></span>
              <span *ngIf="targetProduct?.priceFormatted" class="block text-[11px] font-bold text-emerald-600">Price: {{ targetProduct?.priceFormatted }}</span>
            </div>
          </div>

          <!-- Success Alert -->
          <div *ngIf="inquirySubmitted" class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 mb-4">
            <i class="fa-solid fa-circle-check text-lg"></i>
            <span>Thank you! Your purchase inquiry for '{{ targetProduct?.name }}' has been submitted directly to Admin & Staff. We will contact you shortly.</span>
          </div>

          <form *ngIf="!inquirySubmitted" (ngSubmit)="submitPurchaseQuery()" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Your Full Name</label>
              <input type="text" [(ngModel)]="customerName" name="custName" required placeholder="e.g. Tanvir Hasan" class="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0170B9] outline-none" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Email Address</label>
              <input type="email" [(ngModel)]="customerEmail" name="custEmail" required placeholder="e.g. tanvir&#64;company.com" class="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0170B9] outline-none" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Phone / Mobile Number (Required for Call)</label>
              <input type="text" [(ngModel)]="customerPhone" name="custPhone" required placeholder="e.g. +8801700000000" class="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0170B9] outline-none" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Estimated Quantity Required</label>
              <input type="text" [(ngModel)]="quantity" name="custQty" required placeholder="e.g. 1,000 Boxes / 500 Pcs" class="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0170B9] outline-none" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Additional Specifications / Notes</label>
              <textarea [(ngModel)]="notes" name="custNotes" rows="3" placeholder="e.g. Wholesale price quote required for Chittagong distribution..." class="w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0170B9] outline-none"></textarea>
            </div>

            <button 
              type="submit" 
              [disabled]="!customerName || !customerEmail || !customerPhone || !quantity || isSubmittingInquiry"
              class="w-full bg-[#0170B9] hover:bg-[#005894] disabled:bg-gray-300 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2"
            >
              <span *ngIf="!isSubmittingInquiry">Submit Purchase Query to Admin</span>
              <span *ngIf="isSubmittingInquiry" class="flex items-center gap-2">
                <i class="fa-solid fa-circle-notch animate-spin"></i> Submitting...
              </span>
            </button>
          </form>
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
  isLoading = true;
  rawProducts: KeyaProduct[] = [];
  filteredProducts: KeyaProduct[] = [];
  activeModalProduct: KeyaProduct | null = null;

  // Purchase Query Modal State
  showPurchaseModal = false;
  targetProduct: KeyaProduct | null = null;
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  quantity = '';
  notes = '';
  isSubmittingInquiry = false;
  inquirySubmitted = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.fetchLiveProducts();
    });
  }

  fetchLiveProducts() {
    this.isLoading = true;
    this.dataService.getProductsFromApi(this.selectedCategory).subscribe({
      next: (products) => {
        this.rawProducts = products;
        this.applySearchFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.fetchLiveProducts();
  }

  applySearchFilter() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.rawProducts];
    } else {
      const q = this.searchQuery.toLowerCase();
      this.filteredProducts = this.rawProducts.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
  }

  resetFilters() {
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.fetchLiveProducts();
  }

  openModal(product: KeyaProduct) {
    this.activeModalProduct = product;
  }

  openPurchaseQueryModal(product: KeyaProduct) {
    this.targetProduct = product;
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.quantity = '';
    this.notes = '';
    this.inquirySubmitted = false;
    this.showPurchaseModal = true;
  }

  submitPurchaseQuery() {
    if (!this.targetProduct || !this.customerName || !this.customerEmail || !this.customerPhone || !this.quantity) return;

    this.isSubmittingInquiry = true;

    const payload = {
      productId: this.targetProduct.id,
      productName: this.targetProduct.name,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      quantity: this.quantity,
      notes: this.notes
    };

    this.dataService.submitProductInquiry(payload).subscribe({
      next: () => {
        this.isSubmittingInquiry = false;
        this.inquirySubmitted = true;
        setTimeout(() => {
          this.showPurchaseModal = false;
        }, 3000);
      },
      error: () => {
        this.isSubmittingInquiry = false;
        this.inquirySubmitted = true;
      }
    });
  }
}
