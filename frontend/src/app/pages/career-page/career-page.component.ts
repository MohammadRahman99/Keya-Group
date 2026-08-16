import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyaDataService } from '../../services/keya-data.service';
import { JobOpening } from '../../models/keya-data.model';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase">CAREERS AT KEYA GROUP</h1>
          <p class="text-gray-600 text-sm mt-2 max-w-xl mx-auto">Build your professional future with one of Bangladesh's most respected industrial conglomerates.</p>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Openings List -->
        <div class="space-y-6 max-w-4xl mx-auto">
          <div 
            *ngFor="let job of dataService.jobOpenings" 
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all"
          >
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-blue-50 text-[#0170B9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {{ job.department }}
                </span>
                <span class="text-xs font-semibold text-gray-400">• {{ job.type }}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mb-2">{{ job.title }}</h2>
              <p class="text-xs text-gray-600 mb-3 max-w-2xl leading-relaxed">{{ job.description }}</p>
              
              <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                <span><i class="fa-solid fa-location-dot text-[#0170B9] mr-1"></i> {{ job.location }}</span>
                <span><i class="fa-solid fa-hourglass-half text-[#0170B9] mr-1"></i> Deadline: {{ job.deadline }}</span>
              </div>
            </div>

            <button 
              (click)="applyJob(job)" 
              class="bg-[#0170B9] hover:bg-[#005894] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all flex-shrink-0"
            >
              Apply Now
            </button>
          </div>
        </div>

      </div>

      <!-- Application Form Modal -->
      <div *ngIf="selectedJob" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" (click)="selectedJob = null">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100" (click)="$event.stopPropagation()">
          <button (click)="selectedJob = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <span class="text-xs font-bold text-[#0170B9] uppercase block mb-1">Job Application</span>
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ selectedJob.title }}</h3>

          <form (ngSubmit)="submitApplication()" #appForm="ngForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1">Full Name</label>
              <input type="text" [(ngModel)]="applicant.name" name="applicantName" required class="w-full px-3 py-2 border rounded-lg text-xs" placeholder="John Doe" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1">Email</label>
              <input type="email" [(ngModel)]="applicant.email" name="applicantEmail" required class="w-full px-3 py-2 border rounded-lg text-xs" placeholder="john&#64;example.com" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1">Phone</label>
              <input type="tel" [(ngModel)]="applicant.phone" name="applicantPhone" required class="w-full px-3 py-2 border rounded-lg text-xs" placeholder="+8801700000000" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1">Cover Note / Experience</label>
              <textarea [(ngModel)]="applicant.notes" name="applicantNotes" rows="3" class="w-full px-3 py-2 border rounded-lg text-xs" placeholder="Brief statement..."></textarea>
            </div>

            <button 
              type="submit" 
              [disabled]="!appForm.form.valid || isSubmitting"
              class="w-full bg-[#0170B9] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#005894]"
            >
              Submit Application
            </button>
          </form>

          <div *ngIf="appliedSuccess" class="mt-3 p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
            Application submitted successfully! Our HR team will contact you.
          </div>
        </div>
      </div>

    </div>
  `
})
export class CareerPageComponent {
  dataService = inject(KeyaDataService);
  selectedJob: JobOpening | null = null;
  applicant = { name: '', email: '', phone: '', notes: '' };
  isSubmitting = false;
  appliedSuccess = false;

  applyJob(job: JobOpening) {
    this.selectedJob = job;
    this.appliedSuccess = false;
  }

  submitApplication() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.appliedSuccess = true;
      setTimeout(() => {
        this.selectedJob = null;
        this.applicant = { name: '', email: '', phone: '', notes: '' };
      }, 2000);
    }, 800);
  }
}
