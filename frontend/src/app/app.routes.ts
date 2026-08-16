import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { NewsEventsPageComponent } from './pages/news-events-page/news-events-page.component';
import { CsrPageComponent } from './pages/csr-page/csr-page.component';
import { CareerPageComponent } from './pages/career-page/career-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'about/:slug', component: AboutPageComponent },
  { path: 'our-products', component: ProductsPageComponent },
  { path: 'gallery', component: GalleryPageComponent },
  { path: 'gallery/:type', component: GalleryPageComponent },
  { path: 'news-events', component: NewsEventsPageComponent },
  { path: 'csr', component: CsrPageComponent },
  { path: 'career', component: CareerPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: '' }
];
