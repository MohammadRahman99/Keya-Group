import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeyaProduct, Division, CarouselSlide, NewsArticle, JobOpening } from '../models/keya-data.model';

@Injectable({
  providedIn: 'root'
})
export class KeyaDataService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5242/api'; // ASP.NET Core API URL

  readonly officialVideoUrl = 'https://www.youtube.com/embed/ly3uYm7GGO4?autoplay=1';
  readonly videoPosterUrl = 'https://keyagroupbd.com/wp-content/uploads/2020/12/spinning-mill.jpg';
  readonly logoUrl = 'https://keyagroupbd.com/wp-content/uploads/2020/12/Keya-Group-Logo-.png';
  readonly headerLogoUrl = 'https://keyagroupbd.com/wp-content/uploads/2020/12/cropped-Keya-Group-Logo--135x42.png';

  readonly divisions: Division[] = [
    {
      id: 'knit-composite',
      name: 'Keya Knit Composite',
      slug: 'keya-knit-composite',
      category: 'textiles',
      subtitle: 'KNIT COMPOSITE DIVISION',
      description: 'Keya Knit Composite Division is a fully integrated state-of-the-art manufacturing hub equipped with European circular knitting machines, high-precision dye houses, and cutting-edge garment processing units.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg',
      keyFeatures: [
        'Integrated Knitting, Dyeing, and Garment Manufacturing',
        'Annual Capacity of over 50 Million Pieces',
        'OEKO-TEX Standard 100 Certified',
        'Exporting globally to Europe, USA, and Australia'
      ]
    },
    {
      id: 'spinning-mills',
      name: 'Keya Spinning Mills',
      slug: 'keya-spinning-mills',
      category: 'textiles',
      subtitle: 'SPINNING DIVISION',
      description: 'Keya Spinning Mills produces high-tensile, ultra-soft combed and carded cotton yarns utilizing premium raw cotton imported from Australia and the USA.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/spinning-mill.jpg',
      keyFeatures: [
        'Capacity of 120,000 Spindles',
        '100% Combed and Ring-Spun Cotton Yarn',
        'State-of-the-art Swiss & German Machinery',
        'Strict Quality Testing Laboratory'
      ]
    },
    {
      id: 'cotton-mills',
      name: 'Keya Cotton Mills',
      slug: 'keya-cotton-mills',
      category: 'textiles',
      subtitle: 'COTTON DIVISION',
      description: 'Specializes in high-grade raw cotton processing, fiber carding, and specialized industrial cotton blends for international apparel exporters.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3375.jpg',
      keyFeatures: [
        'Advanced Cotton Carding Technology',
        'Zero-Waste Sustainable Eco-cotton Processing',
        'Custom Yarn Blends for Premium Knitwear'
      ]
    },
    {
      id: 'yarn-mills',
      name: 'Keya Yarn Mills Ltd',
      slug: 'keya-yarn-mills-ltd',
      category: 'textiles',
      subtitle: 'YARN MILLS DIVISION',
      description: 'Provides synthetic, blended, and specialty dyed yarns tailored for high-performance activewear and luxury garment manufacturing.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3397.jpg',
      keyFeatures: [
        'Melange, Heather, and Slub Yarn Specialization',
        'Eco-Friendly Water-Saving Dyeing Process',
        'High Color Fastness & Consistency'
      ]
    },
    {
      id: 'cosmetics',
      name: 'Keya Cosmetics Ltd',
      slug: 'keya-cosmetics-ltd',
      category: 'cosmetics',
      subtitle: 'COSMETICS & TOILETRIES DIVISION',
      description: 'Keya Cosmetics Ltd. is a household name in Bangladesh, pioneering high-quality personal care, skincare, hygiene, and laundry products trusted by millions.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg',
      keyFeatures: [
        'Iconic Brands: Keya Super Lemon Soap, Keya Petroleum Jelly, Keya Toothpaste',
        'GMP & ISO Certified Manufacturing Facilities',
        'Extensive Distribution Network across Bangladesh & South Asia',
        'Dermatologically Tested Formulae'
      ]
    },
    {
      id: 'agro-process',
      name: 'Keya Agro Process Ltd',
      slug: 'keya-agro-process-ltd',
      category: 'cosmetics',
      subtitle: 'AGRO & ORGANIC PROCESSING',
      description: 'Focuses on sustainable agro-processing, natural botanicals, essential oils, and organic agricultural ingredients for cosmetics and health products.',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC4671.jpg',
      keyFeatures: [
        'Natural Herbal Extract Processing',
        'Zero Chemical Additives Policy',
        'Direct Sourcing from Local Organic Farmers'
      ]
    }
  ];

  readonly products: KeyaProduct[] = [
    {
      id: 'super-lemon-soap',
      name: 'Keya Super Lemon Soap',
      category: 'cosmetics',
      categoryLabel: 'Cosmetics & Toiletries',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg',
      description: 'Refreshing citrus beauty soap enriched with natural lemon extracts and moisturizing oils for vibrant, glowing skin.',
      weightOrSize: '100g / 150g',
      badge: 'Best Seller'
    },
    {
      id: 'rmg-apparel',
      name: 'Keya Premium Knitwear & Shirts',
      category: 'textiles',
      categoryLabel: 'RMG & Textiles',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg',
      description: 'High-quality 100% combed cotton polo shirts, hoodies, pullovers, and casual wear manufactured for top global retail brands.',
      badge: 'Global Export'
    },
    {
      id: 'mens-polo-shirt',
      name: 'Men\'s Classic Polo Shirt',
      category: 'textiles',
      categoryLabel: 'RMG & Textiles',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/Mens-Polo-Shirt-1-1400x800-1.png',
      description: 'Ergonomically tailored pique knit polo shirt featuring anti-pilling ring-spun cotton fabric with double-stitched hemline.',
      weightOrSize: 'Sizes S - 3XL'
    },
    {
      id: 'pullover-sweat-shirt',
      name: 'Pullover Fleece Sweatshirt',
      category: 'textiles',
      categoryLabel: 'RMG & Textiles',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/Pullover-Sweat-Shirt-1400x800-1.png',
      description: 'Ultra-warm heavy fleece sweatshirt with ribbed cuffs and neckband designed for international winter apparel lines.',
      weightOrSize: 'Sizes S - XXL'
    },
    {
      id: 'womens-polo-shirt',
      name: 'Women\'s Fitted Polo Shirt',
      category: 'textiles',
      categoryLabel: 'RMG & Textiles',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/Womens-Polo-Shirt-1400x800-1.png',
      description: 'Elegantly shaped 100% soft-touch cotton polo shirt engineered for maximum comfort and style durability.',
      weightOrSize: 'Sizes XS - XL'
    },
    {
      id: 'petroleum-jelly',
      name: 'Keya Pure Petroleum Jelly',
      category: 'cosmetics',
      categoryLabel: 'Cosmetics & Toiletries',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3778.jpg',
      description: '100% triple-purified skin protectant jelly designed to heal dry skin, chapped lips, and minor scrapes.',
      weightOrSize: '50ml / 100ml / 250ml'
    },
    {
      id: 'keya-toothpaste',
      name: 'Keya Herbal Toothpaste',
      category: 'cosmetics',
      categoryLabel: 'Cosmetics & Toiletries',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3752.jpg',
      description: 'Fluoride-balanced herbal oral care toothpaste enriched with clove oil and natural mint for total gum defense.',
      weightOrSize: '100g / 200g'
    },
    {
      id: 'keya-detergent',
      name: 'Keya Super Lemon Laundry Powder',
      category: 'cosmetics',
      categoryLabel: 'Cosmetics & Toiletries',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3411.jpg',
      description: 'Advanced stain-fighting detergent powder with lemon freshness that preserves garment color and fiber texture.',
      weightOrSize: '500g / 1kg / 2kg'
    }
  ];

  readonly carouselSlides: CarouselSlide[] = [
    { id: '1', title: 'Spinning Mill Production', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC4671.jpg', tag: 'Textiles' },
    { id: '2', title: 'Precision Spinning Machines', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3375.jpg', tag: 'Manufacturing' },
    { id: '3', title: 'High Capacity Yarn Spindles', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3397.jpg', tag: 'Factory Floor' },
    { id: '4', title: 'Cotton Carding Unit', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3384.jpg', tag: 'Cotton Division' },
    { id: '5', title: 'Keya Cosmetics Line', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3411.jpg', tag: 'Cosmetics' },
    { id: '6', title: 'Personal Care Packaging', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3752.jpg', tag: 'Toiletries' },
    { id: '7', title: 'Skin Care Products', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3778.jpg', tag: 'Keya Beauty' },
    { id: '8', title: 'Garment Sewing Line', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC4720-1024x682-1.jpg', tag: 'RMG Unit 1' },
    { id: '9', title: 'Quality Inspection Area', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/DSC4722-1024x682-1.jpg', tag: 'Quality Control' },
    { id: '10', title: 'Men\'s Polo Shirt Line', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/Mens-Polo-Shirt-1-1400x800-1.png', tag: 'Apparel' },
    { id: '11', title: 'Pullover Sweat Shirt Collection', imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/Pullover-Sweat-Shirt-1400x800-1.png', tag: 'Knitwear' }
  ];

  readonly newsArticles: NewsArticle[] = [
    {
      id: 'news-1',
      title: 'Keya Group Expands Export Footprint across European Markets',
      date: 'May 14, 2026',
      category: 'Corporate Growth',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg',
      summary: 'Keya Group announces a strategic partnership expansion with European garment distributors, boosting knitwear export volumes by 25% for the upcoming fiscal quarter.'
    },
    {
      id: 'news-2',
      title: 'Keya Cosmetics Upgrades Manufacturing Facility with Solar Energy Integration',
      date: 'April 02, 2026',
      category: 'Sustainability',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg',
      summary: 'In alignment with sustainable green energy goals, Keya Cosmetics Ltd has commissioned a 3.5MW rooftop solar power plant at its Gazipur facility.'
    },
    {
      id: 'news-3',
      title: 'Keya Group Awarded National Quality Excellence Certificate',
      date: 'January 20, 2026',
      category: 'Awards',
      imageUrl: 'https://keyagroupbd.com/wp-content/uploads/2020/12/spinning-mill.jpg',
      summary: 'Recognizing outstanding compliance, eco-friendly textile processing, and workplace safety, Keya Group received top honours at the Annual Bangladesh Industrial Summit.'
    }
  ];

  readonly jobOpenings: JobOpening[] = [
    {
      id: 'job-1',
      title: 'Senior Textile Merchandiser',
      department: 'RMG & Textiles Division',
      location: 'Gazipur, Bangladesh',
      type: 'Full-Time',
      deadline: 'September 15, 2026',
      description: 'Seeking an experienced Merchandiser to manage European retail client accounts, oversee order execution, sample approvals, and production timelines.'
    },
    {
      id: 'job-2',
      title: 'Quality Assurance Manager (Cosmetics)',
      department: 'Keya Cosmetics Ltd',
      location: 'Konabari, Gazipur',
      type: 'Full-Time',
      deadline: 'September 30, 2026',
      description: 'Lead the QA & QC laboratory team, ensure compliance with ISO 22716 & GMP standards, and supervise batch testing of soaps and personal care items.'
    },
    {
      id: 'job-3',
      title: 'Spinning Mill Shift Engineer',
      department: 'Keya Spinning Mills',
      location: 'Jarun, Gazipur',
      type: 'Full-Time',
      deadline: 'October 10, 2026',
      description: 'Oversee mechanical maintenance and smooth round-the-clock operation of high-speed ring spinning frames and yarn carding equipment.'
    }
  ];

  getDivisionBySlug(slug: string): Division | undefined {
    return this.divisions.find(d => d.slug === slug);
  }

  getProductsByCategory(category: string): KeyaProduct[] {
    if (category === 'all') return this.products;
    return this.products.filter(p => p.category === category);
  }

  // ASP.NET Core API Integration Calls
  submitContactInquiry(inquiry: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, inquiry).pipe(
      catchError(() => of({ message: 'Submitted via fallback' }))
    );
  }

  submitJobApplication(application: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/careers/apply`, application).pipe(
      catchError(() => of({ message: 'Application submitted via fallback' }))
    );
  }
}
