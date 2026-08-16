import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white border-t border-gray-300 py-8 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <!-- Copyright Info -->
          <div class="text-sm text-gray-600 font-medium">
            Copyright © {{ currentYear }} <span class="text-gray-900 font-semibold">Keya Group</span> | Developed By 
            <a href="http://icthub.net/" target="_blank" rel="noopener noreferrer" class="text-[#0170B9] hover:underline font-medium">
              ICT Hub
            </a>
          </div>

          <!-- Social Media Icons -->
          <div class="flex items-center space-x-3">
            <!-- Facebook -->
            <a 
              href="https://www.facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              class="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-[#0170B9] hover:text-white hover:border-[#0170B9] transition-all transform hover:scale-110 shadow-sm"
            >
              <i class="fa-brands fa-facebook-f text-sm"></i>
            </a>

            <!-- Twitter -->
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              class="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-[#0170B9] hover:text-white hover:border-[#0170B9] transition-all transform hover:scale-110 shadow-sm"
            >
              <i class="fa-brands fa-twitter text-sm"></i>
            </a>

            <!-- Instagram -->
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              class="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-[#0170B9] hover:text-white hover:border-[#0170B9] transition-all transform hover:scale-110 shadow-sm"
            >
              <i class="fa-brands fa-instagram text-sm"></i>
            </a>

            <!-- YouTube -->
            <a 
              href="https://www.youtube.com/watch?v=ly3uYm7GGO4" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              class="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all transform hover:scale-110 shadow-sm"
            >
              <i class="fa-brands fa-youtube text-sm"></i>
            </a>
          </div>

        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
