import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { KeyaDataService } from '../../../services/keya-data.service';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-900 text-white relative overflow-hidden">
      
      <!-- Background Ambient Glow -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-black to-slate-900/40 opacity-80 pointer-events-none"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center mb-10">
          <span class="text-[#0170B9] text-xs font-bold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Corporate Presentation
          </span>
          <h2 class="text-2xl md:text-4xl font-bold mt-3 text-white tracking-wide">
            Keya Group Official Video
          </h2>
          <div class="w-16 h-1 bg-[#0170B9] mx-auto rounded-full mt-4"></div>
        </div>

        <!-- Video Player Card -->
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black aspect-video group">
          
          <!-- Poster Preview (Visible before play) -->
          <div *ngIf="!isPlaying" class="relative w-full h-full cursor-pointer" (click)="playVideo()">
            <img 
              [src]="dataService.videoPosterUrl" 
              alt="Keya Group Spinning Mill Video Poster" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
            />
            
            <!-- Dark Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <!-- Pulsing Play Button -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="relative flex items-center justify-center">
                <!-- Pulse animation ring -->
                <div class="absolute w-20 h-20 md:w-24 md:h-24 bg-[#0170B9] rounded-full animate-ping opacity-75"></div>
                <!-- Main Button -->
                <div class="w-16 h-16 md:w-20 md:h-20 bg-[#0170B9] hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 z-10">
                  <i class="fa-solid fa-play text-2xl md:text-3xl ml-1"></i>
                </div>
              </div>
              <span class="mt-4 text-sm font-semibold tracking-wider uppercase text-white/90 drop-shadow-md">
                Click to Watch Corporate Video
              </span>
            </div>

            <!-- Bottom Video Badge -->
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
              <div class="flex items-center gap-2">
                <i class="fa-brands fa-youtube text-red-500 text-base"></i>
                <span>Keya Group Official Documentary</span>
              </div>
              <span class="bg-black/60 px-2.5 py-1 rounded text-white/80">HD 1080p</span>
            </div>
          </div>

          <!-- YouTube Embedded Iframe (Active on Play) -->
          <iframe 
            *ngIf="isPlaying"
            [src]="safeVideoUrl" 
            title="Keya Group Official Video" 
            class="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
          ></iframe>

        </div>

      </div>
    </section>
  `
})
export class VideoSectionComponent {
  dataService = inject(KeyaDataService);
  sanitizer = inject(DomSanitizer);

  isPlaying = false;
  safeVideoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dataService.officialVideoUrl);

  playVideo() {
    this.isPlaying = true;
  }
}
