import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../components/home/hero-banner/hero-banner.component';
import { AboutIntroComponent } from '../../components/home/about-intro/about-intro.component';
import { ProductHighlightsComponent } from '../../components/home/product-highlights/product-highlights.component';
import { MediaCarouselComponent } from '../../components/home/media-carousel/media-carousel.component';
import { VideoSectionComponent } from '../../components/home/video-section/video-section.component';
import { ContactSectionComponent } from '../../components/home/contact-section/contact-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroBannerComponent,
    AboutIntroComponent,
    ProductHighlightsComponent,
    MediaCarouselComponent,
    VideoSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <main class="w-full">
      <app-hero-banner></app-hero-banner>
      <app-about-intro></app-about-intro>
      <app-product-highlights></app-product-highlights>
      <app-media-carousel></app-media-carousel>
      <app-video-section></app-video-section>
      <app-contact-section></app-contact-section>
    </main>
  `
})
export class HomePageComponent {}
