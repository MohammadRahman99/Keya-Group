import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { KeyaDataService } from '../../services/keya-data.service';
import { KeyaProduct, Category, ProductInquiry } from '../../models/keya-data.model';
import { Employee } from '../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-16">
      
      <!-- Top Admin Navigation Bar -->
      <div class="bg-gray-900 text-white border-b border-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#0170B9] flex items-center justify-center font-bold text-lg text-white">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
            <div>
              <h1 class="text-lg font-bold leading-tight">Keya Group Management Portal</h1>
              <span class="text-xs text-gray-400">Welcome, {{ authService.currentUserValue?.fullName }}</span>
            </div>
          </div>

          <!-- User Role & Logout -->
          <div class="flex items-center gap-3">
            <span [ngClass]="{
              'bg-purple-500/20 text-purple-300 border-purple-500/30': authService.currentRole === 'Admin',
              'bg-blue-500/20 text-blue-300 border-blue-500/30': authService.currentRole === 'ProductManager',
              'bg-emerald-500/20 text-emerald-300 border-emerald-500/30': authService.currentRole === 'Operator'
            }" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border">
              <i [ngClass]="{
                'fa-solid fa-user-shield mr-1': authService.currentRole === 'Admin',
                'fa-solid fa-boxes-packing mr-1': authService.currentRole === 'ProductManager',
                'fa-solid fa-headset mr-1': authService.currentRole === 'Operator'
              }"></i>
              {{ authService.currentRole === 'ProductManager' ? 'Product Manager' : authService.currentRole }} Role
            </span>

            <button 
              (click)="authService.logout()" 
              class="bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>

        </div>
      </div>

      <!-- Main Dashboard Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <!-- Role-Based Navigation Tabs Bar -->
        <div class="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-2">
          
          <!-- 1. Product Purchase Queries Tab (Visible to Admin & Operator) -->
          <button 
            *ngIf="authService.currentRole === 'Admin' || authService.currentRole === 'Operator'"
            (click)="activeTab = 'productQueries'" 
            [class]="activeTab === 'productQueries' ? 'bg-[#0170B9] text-white font-bold shadow' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 relative"
          >
            <i class="fa-solid fa-cart-flatbed"></i> Product Purchase Queries
            <span *ngIf="productQueriesList.length > 0" class="bg-amber-400 text-gray-900 font-extrabold px-1.5 py-0.5 rounded-full text-[10px]">
              {{ productQueriesList.length }}
            </span>
          </button>

          <!-- 2. Products CRUD Tab (Visible to Admin, Product Manager & Operator) -->
          <button 
            (click)="activeTab = 'products'" 
            [class]="activeTab === 'products' ? 'bg-[#0170B9] text-white font-bold shadow' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-box-open"></i> Products Management
          </button>

          <!-- 3. Categories CRUD Tab (Visible to Admin, Product Manager & Operator) -->
          <button 
            (click)="activeTab = 'categories'" 
            [class]="activeTab === 'categories' ? 'bg-[#0170B9] text-white font-bold shadow' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-layer-group"></i> Categories & Subcategories
          </button>

          <!-- 4. Employee Directory CRUD Tab (STRICTLY EXCLUSIVE TO ADMIN ONLY) -->
          <button 
            *ngIf="authService.currentRole === 'Admin'"
            (click)="activeTab = 'employees'" 
            [class]="activeTab === 'employees' ? 'bg-purple-700 text-white font-bold shadow' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-user-shield"></i> Employee Directory (Admin Only)
          </button>

          <!-- 5. General Contact Inquiries Tab (Visible to Admin & Operator) -->
          <button 
            *ngIf="authService.currentRole === 'Admin' || authService.currentRole === 'Operator'"
            (click)="activeTab = 'inquiries'" 
            [class]="activeTab === 'inquiries' ? 'bg-[#0170B9] text-white font-bold shadow' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2"
          >
            <i class="fa-solid fa-envelope-open-text"></i> Contact Inquiries
          </button>

        </div>

        <!-- 1. PRODUCT PURCHASE QUERIES TAB -->
        <div *ngIf="activeTab === 'productQueries' && (authService.currentRole === 'Admin' || authService.currentRole === 'Operator')" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 class="text-lg font-bold text-gray-900">Customer Product Purchase Queries & Quotes</h2>
                <p class="text-xs text-gray-500">Customer purchase inquiries submitted for specific products. Use phone & email details to follow up.</p>
              </div>
              <span class="bg-blue-100 text-[#0170B9] text-xs font-bold px-3 py-1 rounded-full">
                Sales & Operations
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-gray-700">
                <thead class="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th class="px-4 py-3">Target Product</th>
                    <th class="px-4 py-3">Customer Name</th>
                    <th class="px-4 py-3">Contact Details (Phone / Email)</th>
                    <th class="px-4 py-3">Quantity Requested</th>
                    <th class="px-4 py-3">Customer Notes</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Follow-up Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium">
                  <tr *ngFor="let q of productQueriesList" class="hover:bg-gray-50/60">
                    <td class="px-4 py-3 font-extrabold text-gray-900">
                      <span class="text-[#0170B9] block"><i class="fa-solid fa-box mr-1"></i> {{ q.productName }}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold text-gray-900">{{ q.customerName }}</td>
                    <td class="px-4 py-3 space-y-0.5">
                      <div class="text-gray-900 font-bold"><i class="fa-solid fa-phone text-emerald-600 mr-1"></i> {{ q.customerPhone }}</div>
                      <div class="text-gray-500 text-[11px]"><i class="fa-solid fa-envelope text-blue-500 mr-1"></i> {{ q.customerEmail }}</div>
                    </td>
                    <td class="px-4 py-3 font-bold text-gray-800">
                      <span class="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">
                        {{ q.quantity }}
                      </span>
                    </td>
                    <td class="px-4 py-3 max-w-xs truncate text-gray-600">{{ q.notes || '-' }}</td>
                    <td class="px-4 py-3">
                      <span [ngClass]="{
                        'bg-amber-100 text-amber-800': q.status === 'Pending',
                        'bg-blue-100 text-blue-800': q.status === 'Contacted',
                        'bg-emerald-100 text-emerald-800': q.status === 'Completed'
                      }" class="px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                        {{ q.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right space-x-2">
                      <button 
                        (click)="updateQueryStatus(q, 'Contacted')" 
                        [disabled]="q.status === 'Contacted' || q.status === 'Completed'" 
                        class="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 px-3 py-1 rounded font-bold text-[11px] transition-colors disabled:opacity-40"
                      >
                        <i class="fa-solid fa-phone-volume mr-1"></i> Mark Contacted
                      </button>

                      <button 
                        (click)="updateQueryStatus(q, 'Completed')" 
                        [disabled]="q.status === 'Completed'" 
                        class="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 px-3 py-1 rounded font-bold text-[11px] transition-colors disabled:opacity-40"
                      >
                        <i class="fa-solid fa-check-double mr-1"></i> Completed
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 2. PRODUCTS MANAGEMENT TAB -->
        <div *ngIf="activeTab === 'products'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 class="text-lg font-bold text-gray-900">Product Catalogue CRUD</h2>
                <p class="text-xs text-gray-500">Create, update, or remove Keya Group products live in SQL Server database.</p>
              </div>
              <button 
                (click)="openAddProductModal()" 
                class="bg-[#0170B9] hover:bg-[#005894] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-2 w-max"
              >
                <i class="fa-solid fa-plus"></i> Add New Product
              </button>
            </div>

            <!-- Products Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-gray-700">
                <thead class="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th class="px-4 py-3">Image</th>
                    <th class="px-4 py-3">Product Name</th>
                    <th class="px-4 py-3">Category</th>
                    <th class="px-4 py-3">Badge / Tag</th>
                    <th class="px-4 py-3">Specification</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium">
                  <tr *ngFor="let p of productsList" class="hover:bg-gray-50/60">
                    <td class="px-4 py-3">
                      <img [src]="p.imageUrl" [alt]="p.name" class="w-12 h-12 object-cover rounded-lg border" />
                    </td>
                    <td class="px-4 py-3 font-semibold text-gray-900">{{ p.name }}</td>
                    <td class="px-4 py-3">
                      <span [class]="p.category === 'cosmetics' ? 'bg-blue-50 text-[#0170B9]' : 'bg-emerald-50 text-emerald-700'" class="px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                        {{ p.categoryLabel }}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <span *ngIf="p.badge" class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">
                        {{ p.badge }}
                      </span>
                      <span *ngIf="!p.badge" class="text-gray-400">-</span>
                    </td>
                    <td class="px-4 py-3 text-gray-500">{{ p.weightOrSize || '-' }}</td>
                    <td class="px-4 py-3 text-right space-x-2">
                      <button (click)="openEditProductModal(p)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button (click)="deleteProduct(p.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. CATEGORIES & SUBCATEGORIES TAB -->
        <div *ngIf="activeTab === 'categories'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 class="text-lg font-bold text-gray-900">Categories & Subcategories Management</h2>
                <p class="text-xs text-gray-500">Configure product categories and subcategory tags for Keya Group.</p>
              </div>
              <button 
                (click)="openAddCategoryModal()" 
                class="bg-[#0170B9] hover:bg-[#005894] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-2 w-max"
              >
                <i class="fa-solid fa-folder-plus"></i> Add New Category
              </button>
            </div>

            <!-- Categories Accordion / Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div *ngFor="let cat of categoriesList" class="bg-gray-50/70 border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-base font-bold text-gray-900">{{ cat.name }}</h3>
                    <div class="flex items-center gap-1">
                      <button (click)="openEditCategoryModal(cat)" class="p-1.5 text-blue-600 hover:bg-blue-100 rounded" title="Edit Category">
                        <i class="fa-solid fa-pen text-xs"></i>
                      </button>
                      <button (click)="deleteCategory(cat.id)" class="p-1.5 text-red-600 hover:bg-red-100 rounded" title="Delete Category">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mb-4">{{ cat.description }}</p>

                  <!-- Subcategories Tags -->
                  <div>
                    <span class="text-[11px] uppercase font-bold text-gray-400 block mb-2">Subcategories:</span>
                    <div class="flex flex-wrap gap-2">
                      <span *ngFor="let sub of cat.subcategories" class="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                        <span>{{ sub.name }}</span>
                        <button (click)="deleteSubcategory(sub.id!)" class="text-gray-400 hover:text-red-600">
                          <i class="fa-solid fa-xmark text-[10px]"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Add Subcategory Button -->
                <div class="mt-6 pt-4 border-t border-gray-200/80 flex justify-end">
                  <button (click)="openAddSubcategoryModal(cat)" class="text-xs text-[#0170B9] hover:underline font-bold flex items-center gap-1">
                    <i class="fa-solid fa-plus-circle"></i> Add Subcategory Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. EMPLOYEE / STAFF DIRECTORY TAB (ADMIN ONLY) -->
        <div *ngIf="activeTab === 'employees' && authService.currentRole === 'Admin'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-lg font-bold text-gray-900">Employee Directory Management</h2>
                  <span class="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">Admin Exclusive</span>
                </div>
                <p class="text-xs text-gray-500">Manage internal staff accounts, system permissions, and account activation.</p>
              </div>
              <button 
                (click)="openAddEmployeeModal()" 
                class="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-2 w-max"
              >
                <i class="fa-solid fa-user-plus"></i> Add New Employee
              </button>
            </div>

            <!-- Employees Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-gray-700">
                <thead class="bg-purple-50/50 text-gray-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th class="px-4 py-3">Staff Name</th>
                    <th class="px-4 py-3">Email Address</th>
                    <th class="px-4 py-3">Role</th>
                    <th class="px-4 py-3">Department</th>
                    <th class="px-4 py-3">Phone</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium">
                  <tr *ngFor="let emp of employeesList" class="hover:bg-purple-50/20">
                    <td class="px-4 py-3 font-semibold text-gray-900">{{ emp.fullName }}</td>
                    <td class="px-4 py-3 text-[#0170B9]">{{ emp.email }}</td>
                    <td class="px-4 py-3">
                      <span [ngClass]="{
                        'bg-purple-100 text-purple-800': emp.role === 'Admin',
                        'bg-blue-100 text-[#0170B9]': emp.role === 'ProductManager',
                        'bg-emerald-100 text-emerald-800': emp.role === 'Operator'
                      }" class="px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                        {{ emp.role }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-600">{{ emp.department || 'General' }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ emp.phoneNumber || '-' }}</td>
                    <td class="px-4 py-3">
                      <span [class]="emp.isActive ? 'text-emerald-600' : 'text-gray-400'" class="font-bold">
                        <i class="fa-solid fa-circle text-[8px] mr-1"></i> {{ emp.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right space-x-2">
                      <button (click)="openEditEmployeeModal(emp)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button (click)="deleteEmployee(emp.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 5. GENERAL CONTACT INQUIRIES TAB -->
        <div *ngIf="activeTab === 'inquiries' && (authService.currentRole === 'Admin' || authService.currentRole === 'Operator')" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 class="text-lg font-bold text-gray-900">General Website Contact Inquiries</h2>
                <p class="text-xs text-gray-500">General inquiries submitted via the Contact Us form.</p>
              </div>
              <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Operations
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-gray-700">
                <thead class="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th class="px-4 py-3">Sender Name</th>
                    <th class="px-4 py-3">Email Address</th>
                    <th class="px-4 py-3">Message Content</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium">
                  <tr *ngFor="let inq of inquiriesList" class="hover:bg-gray-50/60">
                    <td class="px-4 py-3 font-semibold text-gray-900">{{ inq.name }}</td>
                    <td class="px-4 py-3 text-[#0170B9]">{{ inq.email }}</td>
                    <td class="px-4 py-3 max-w-xs truncate">{{ inq.message }}</td>
                    <td class="px-4 py-3">
                      <span [class]="inq.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'" class="px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                        {{ inq.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                      <button (click)="markResolved(inq)" [disabled]="inq.status === 'Resolved'" class="bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 px-3 py-1 rounded font-bold text-[11px] transition-colors disabled:opacity-50">
                        Mark Resolved
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal: Add/Edit Product -->
      <div *ngIf="showProductModal" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
          <button (click)="showProductModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ isEditingProduct ? 'Edit Product' : 'Add New Product' }}</h3>

          <form (ngSubmit)="saveProduct()" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Product Name</label>
              <input type="text" [(ngModel)]="activeProduct.name" name="pName" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Category</label>
              <select [(ngModel)]="activeProduct.category" name="pCat" (change)="onCatChange()" class="w-full px-3 py-2 border rounded-lg">
                <option value="cosmetics">Cosmetics & Toiletries</option>
                <option value="textiles">RMG & Textiles</option>
              </select>
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Image URL</label>
              <input type="text" [(ngModel)]="activeProduct.imageUrl" name="pImg" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Badge (Optional)</label>
              <input type="text" [(ngModel)]="activeProduct.badge" name="pBadge" placeholder="Best Seller" class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Description</label>
              <textarea [(ngModel)]="activeProduct.description" name="pDesc" rows="3" required class="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>

            <button type="submit" class="w-full bg-[#0170B9] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#005894]">
              {{ isEditingProduct ? 'Update Product' : 'Create Product' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Modal: Add/Edit Category -->
      <div *ngIf="showCategoryModal" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
          <button (click)="showCategoryModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ isEditingCategory ? 'Edit Category' : 'Add New Category' }}</h3>

          <form (ngSubmit)="saveCategory()" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Category Name</label>
              <input type="text" [(ngModel)]="activeCategory.name" name="cName" (input)="autoSlugCategory()" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">URL Slug</label>
              <input type="text" [(ngModel)]="activeCategory.slug" name="cSlug" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Description</label>
              <textarea [(ngModel)]="activeCategory.description" name="cDesc" rows="3" required class="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>

            <button type="submit" class="w-full bg-[#0170B9] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#005894]">
              {{ isEditingCategory ? 'Update Category' : 'Create Category' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Modal: Add Subcategory -->
      <div *ngIf="showSubcategoryModal" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
          <button (click)="showSubcategoryModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h3 class="text-lg font-bold text-gray-900 mb-4">Add Subcategory to '{{ parentCategory?.name }}'</h3>

          <form (ngSubmit)="saveSubcategory()" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Subcategory Name</label>
              <input type="text" [(ngModel)]="activeSubcategory.name" name="subName" (input)="autoSlugSubcategory()" required class="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Polo Shirts" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">URL Slug</label>
              <input type="text" [(ngModel)]="activeSubcategory.slug" name="subSlug" required class="w-full px-3 py-2 border rounded-lg" placeholder="e.g. polo-shirts" />
            </div>

            <button type="submit" class="w-full bg-[#0170B9] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#005894]">
              Add Subcategory
            </button>
          </form>
        </div>
      </div>

      <!-- Modal: Add/Edit Employee -->
      <div *ngIf="showEmployeeModal" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
          <button (click)="showEmployeeModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ isEditingEmployee ? 'Edit Employee' : 'Add New Employee Account' }}</h3>

          <form (ngSubmit)="saveEmployee()" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Full Name</label>
              <input type="text" [(ngModel)]="activeEmployee.fullName" name="eName" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Email Address</label>
              <input type="email" [(ngModel)]="activeEmployee.email" name="eEmail" required class="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Password {{ isEditingEmployee ? '(Leave blank to keep unchanged)' : '' }}</label>
              <input type="password" [(ngModel)]="activeEmployee.password" name="ePass" [required]="!isEditingEmployee" class="w-full px-3 py-2 border rounded-lg" placeholder="••••••••" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">System Role</label>
              <select [(ngModel)]="activeEmployee.role" name="eRole" required class="w-full px-3 py-2 border rounded-lg">
                <option value="Admin">Admin (Full System Control)</option>
                <option value="ProductManager">Product Manager (Products & Categories)</option>
                <option value="Operator">Operator (Contact Inquiries & Operations)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Department</label>
              <input type="text" [(ngModel)]="activeEmployee.department" name="eDept" class="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Merchandising" />
            </div>

            <div>
              <label class="block font-bold uppercase text-gray-600 mb-1">Phone Number</label>
              <input type="text" [(ngModel)]="activeEmployee.phoneNumber" name="ePhone" class="w-full px-3 py-2 border rounded-lg" placeholder="+8801700000000" />
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" [(ngModel)]="activeEmployee.isActive" name="eActive" id="eActiveCheck" class="rounded text-[#0170B9]" />
              <label for="eActiveCheck" class="font-bold text-gray-700">Account Active</label>
            </div>

            <button type="submit" class="w-full bg-[#0170B9] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#005894]">
              {{ isEditingEmployee ? 'Update Employee' : 'Create Employee Account' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  authService = inject(AuthService);
  dataService = inject(KeyaDataService);

  activeTab: 'productQueries' | 'products' | 'categories' | 'employees' | 'inquiries' = 'productQueries';

  productQueriesList: ProductInquiry[] = [];
  productsList: KeyaProduct[] = [];
  categoriesList: Category[] = [];
  employeesList: Employee[] = [];
  inquiriesList: any[] = [];

  // Product Modal State
  showProductModal = false;
  isEditingProduct = false;
  activeProduct: any = {};

  // Category Modal State
  showCategoryModal = false;
  isEditingCategory = false;
  activeCategory: any = {};

  // Subcategory Modal State
  showSubcategoryModal = false;
  parentCategory: Category | null = null;
  activeSubcategory: any = {};

  // Employee Modal State
  showEmployeeModal = false;
  isEditingEmployee = false;
  activeEmployee: any = {};

  ngOnInit() {
    this.configureDefaultRoleTab();
    this.loadProductQueries();
    this.loadProducts();
    this.loadCategories();
    this.loadEmployees();
    this.loadInquiries();
  }

  configureDefaultRoleTab() {
    const role = this.authService.currentRole;
    if (role === 'ProductManager') {
      this.activeTab = 'products';
    } else {
      this.activeTab = 'productQueries';
    }
  }

  loadProductQueries() {
    this.dataService.getProductInquiriesFromApi().subscribe(queries => this.productQueriesList = queries);
  }

  updateQueryStatus(query: ProductInquiry, newStatus: string) {
    if (query.id) {
      this.dataService.updateProductInquiryStatusApi(query.id, newStatus).subscribe(() => {
        query.status = newStatus;
      });
    } else {
      query.status = newStatus;
    }
  }

  loadProducts() {
    this.dataService.getProductsFromApi().subscribe(products => this.productsList = products);
  }

  loadCategories() {
    this.dataService.getCategoriesFromApi().subscribe(categories => this.categoriesList = categories);
  }

  loadEmployees() {
    if (this.authService.currentRole === 'Admin') {
      this.dataService.getEmployeesFromApi().subscribe(employees => this.employeesList = employees);
    }
  }

  loadInquiries() {
    this.dataService.getInquiriesFromApi().subscribe(inquiries => this.inquiriesList = inquiries);
  }

  // --- PRODUCT CRUD ---
  openAddProductModal() {
    this.isEditingProduct = false;
    this.activeProduct = { id: 0, name: '', category: 'cosmetics', categoryLabel: 'Cosmetics & Toiletries', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg', description: '', badge: 'New Arrival' };
    this.showProductModal = true;
  }

  openEditProductModal(p: KeyaProduct) {
    this.isEditingProduct = true;
    this.activeProduct = { ...p };
    this.showProductModal = true;
  }

  onCatChange() {
    if (this.activeProduct.category === 'cosmetics') {
      this.activeProduct.categoryLabel = 'Cosmetics & Toiletries';
    } else {
      this.activeProduct.categoryLabel = 'RMG & Textiles';
    }
  }

  saveProduct() {
    if (this.isEditingProduct) {
      this.dataService.updateProductApi(this.activeProduct.id, this.activeProduct).subscribe(() => {
        this.loadProducts();
        this.showProductModal = false;
      });
    } else {
      this.dataService.createProductApi(this.activeProduct).subscribe(() => {
        this.loadProducts();
        this.showProductModal = false;
      });
    }
  }

  deleteProduct(id: string) {
    this.dataService.deleteProductApi(id).subscribe(() => this.loadProducts());
  }

  // --- CATEGORIES & SUBCATEGORIES CRUD ---
  openAddCategoryModal() {
    this.isEditingCategory = false;
    this.activeCategory = { name: '', slug: '', description: '' };
    this.showCategoryModal = true;
  }

  openEditCategoryModal(cat: Category) {
    this.isEditingCategory = true;
    this.activeCategory = { ...cat };
    this.showCategoryModal = true;
  }

  autoSlugCategory() {
    if (!this.isEditingCategory) {
      this.activeCategory.slug = (this.activeCategory.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  }

  saveCategory() {
    if (this.isEditingCategory) {
      this.dataService.updateCategoryApi(this.activeCategory.id, this.activeCategory).subscribe(() => {
        this.loadCategories();
        this.showCategoryModal = false;
      });
    } else {
      this.dataService.createCategoryApi(this.activeCategory).subscribe(() => {
        this.loadCategories();
        this.showCategoryModal = false;
      });
    }
  }

  deleteCategory(id: number) {
    this.dataService.deleteCategoryApi(id).subscribe(() => this.loadCategories());
  }

  openAddSubcategoryModal(cat: Category) {
    this.parentCategory = cat;
    this.activeSubcategory = { name: '', slug: '' };
    this.showSubcategoryModal = true;
  }

  autoSlugSubcategory() {
    this.activeSubcategory.slug = (this.activeSubcategory.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  saveSubcategory() {
    if (!this.parentCategory) return;
    this.dataService.addSubcategoryApi(this.parentCategory.id, this.activeSubcategory).subscribe(() => {
      this.loadCategories();
      this.showSubcategoryModal = false;
    });
  }

  deleteSubcategory(subId: number) {
    this.dataService.deleteSubcategoryApi(subId).subscribe(() => this.loadCategories());
  }

  // --- EMPLOYEE CRUD (ADMIN ONLY) ---
  openAddEmployeeModal() {
    if (this.authService.currentRole !== 'Admin') return;
    this.isEditingEmployee = false;
    this.activeEmployee = { fullName: '', email: '', password: '', role: 'Operator', department: 'General Operations', phoneNumber: '', isActive: true };
    this.showEmployeeModal = true;
  }

  openEditEmployeeModal(emp: Employee) {
    if (this.authService.currentRole !== 'Admin') return;
    this.isEditingEmployee = true;
    this.activeEmployee = { ...emp, password: '' };
    this.showEmployeeModal = true;
  }

  saveEmployee() {
    if (this.authService.currentRole !== 'Admin') return;
    if (this.isEditingEmployee) {
      this.dataService.updateEmployeeApi(this.activeEmployee.id, this.activeEmployee).subscribe(() => {
        this.loadEmployees();
        this.showEmployeeModal = false;
      });
    } else {
      this.dataService.createEmployeeApi(this.activeEmployee).subscribe(() => {
        this.loadEmployees();
        this.showEmployeeModal = false;
      });
    }
  }

  deleteEmployee(id: number) {
    if (this.authService.currentRole !== 'Admin') return;
    this.dataService.deleteEmployeeApi(id).subscribe(() => this.loadEmployees());
  }

  markResolved(inquiry: any) {
    if (inquiry.id) {
      this.dataService.resolveInquiryApi(inquiry.id).subscribe(() => inquiry.status = 'Resolved');
    } else {
      inquiry.status = 'Resolved';
    }
  }
}
