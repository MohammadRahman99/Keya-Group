using KeyaGroup.API.Entities;
using KeyaGroup.API.Services;
using Microsoft.EntityFrameworkCore;

namespace KeyaGroup.API.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(KeyaGroupDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            if (!await context.Categories.AnyAsync())
            {
                var cosmeticsCat = new Category
                {
                    Name = "Cosmetics & Toiletries",
                    Slug = "cosmetics-toiletries",
                    Description = "Personal care, skincare, oral hygiene, and household laundry products.",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Beauty Soap", Slug = "beauty-soap" },
                        new Subcategory { Name = "Petroleum Jelly", Slug = "petroleum-jelly" },
                        new Subcategory { Name = "Oral Care & Toothpaste", Slug = "oral-care" },
                        new Subcategory { Name = "Laundry Detergent Powder", Slug = "laundry-detergent" }
                    }
                };

                var rmgCat = new Category
                {
                    Name = "RMG & Textiles",
                    Slug = "rmg-textiles",
                    Description = "High-quality knitwear, cotton yarns, combed fibers, and exported apparel.",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Men's Polo Shirts", Slug = "mens-polo" },
                        new Subcategory { Name = "Women's Knitwear", Slug = "womens-knitwear" },
                        new Subcategory { Name = "Fleece Sweatshirts & Hoodies", Slug = "sweatshirts" },
                        new Subcategory { Name = "Ring-Spun Cotton Yarns", Slug = "cotton-yarns" }
                    }
                };

                var agroCat = new Category
                {
                    Name = "Agro & Organic Processing",
                    Slug = "agro-processing",
                    Description = "Botanical extracts, natural herbal processing, and essential organic oils.",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Natural Herbal Extracts", Slug = "herbal-extracts" },
                        new Subcategory { Name = "Organic Essential Oils", Slug = "essential-oils" }
                    }
                };

                await context.Categories.AddRangeAsync(new[] { cosmeticsCat, rmgCat, agroCat });
            }

            if (!await context.Users.AnyAsync())
            {
                var demoUsers = new List<User>
                {
                    new User
                    {
                        FullName = "System Administrator",
                        Email = "admin@keyagroup.com",
                        PasswordHash = PasswordHasher.HashPassword("Admin123!"),
                        Role = "Admin",
                        Department = "Executive Management",
                        PhoneNumber = "+8801711001122",
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        FullName = "Product Manager",
                        Email = "pm@keyagroup.com",
                        PasswordHash = PasswordHasher.HashPassword("Pm123!"),
                        Role = "ProductManager",
                        Department = "Product Merchandising & Catalogue",
                        PhoneNumber = "+8801722334455",
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        FullName = "Operations Staff",
                        Email = "operator@keyagroup.com",
                        PasswordHash = PasswordHasher.HashPassword("Operator"),
                        Role = "Operator",
                        Department = "Customer Inquiries & Operations",
                        PhoneNumber = "+8801833445566",
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    }
                };

                await context.Users.AddRangeAsync(demoUsers);
            }

            if (!await context.Divisions.AnyAsync())
            {
                var divisions = new List<Division>
                {
                    new Division
                    {
                        Name = "Keya Knit Composite",
                        Slug = "keya-knit-composite",
                        Category = "textiles",
                        Subtitle = "KNIT COMPOSITE DIVISION",
                        Description = "Keya Knit Composite Division is a fully integrated state-of-the-art manufacturing hub equipped with European circular knitting machines, high-precision dye houses, and cutting-edge garment processing units.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg",
                        KeyFeaturesJson = "[\"Integrated Knitting, Dyeing, and Garment Manufacturing\", \"Annual Capacity of over 50 Million Pieces\", \"OEKO-TEX Standard 100 Certified\", \"Exporting globally to Europe, USA, and Australia\"]"
                    },
                    new Division
                    {
                        Name = "Keya Spinning Mills",
                        Slug = "keya-spinning-mills",
                        Category = "textiles",
                        Subtitle = "SPINNING DIVISION",
                        Description = "Keya Spinning Mills produces high-tensile, ultra-soft combed and carded cotton yarns utilizing premium raw cotton imported from Australia and the USA.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/spinning-mill.jpg",
                        KeyFeaturesJson = "[\"Capacity of 120,000 Spindles\", \"100% Combed and Ring-Spun Cotton Yarn\", \"State-of-the-art Swiss & German Machinery\", \"Strict Quality Testing Laboratory\"]"
                    },
                    new Division
                    {
                        Name = "Keya Cotton Mills",
                        Slug = "keya-cotton-mills",
                        Category = "textiles",
                        Subtitle = "COTTON DIVISION",
                        Description = "Specializes in high-grade raw cotton processing, fiber carding, and specialized industrial cotton blends for international apparel exporters.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3375.jpg",
                        KeyFeaturesJson = "[\"Advanced Cotton Carding Technology\", \"Zero-Waste Sustainable Eco-cotton Processing\", \"Custom Yarn Blends for Premium Knitwear\"]"
                    },
                    new Division
                    {
                        Name = "Keya Yarn Mills Ltd",
                        Slug = "keya-yarn-mills-ltd",
                        Category = "textiles",
                        Subtitle = "YARN MILLS DIVISION",
                        Description = "Provides synthetic, blended, and specialty dyed yarns tailored for high-performance activewear and luxury garment manufacturing.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3397.jpg",
                        KeyFeaturesJson = "[\"Melange, Heather, and Slub Yarn Specialization\", \"Eco-Friendly Water-Saving Dyeing Process\", \"High Color Fastness & Consistency\"]"
                    },
                    new Division
                    {
                        Name = "Keya Cosmetics Ltd",
                        Slug = "keya-cosmetics-ltd",
                        Category = "cosmetics",
                        Subtitle = "COSMETICS & TOILETRIES DIVISION",
                        Description = "Keya Cosmetics Ltd. is a household name in Bangladesh, pioneering high-quality personal care, skincare, hygiene, and laundry products trusted by millions.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg",
                        KeyFeaturesJson = "[\"Iconic Brands: Keya Super Lemon Soap, Keya Petroleum Jelly, Keya Toothpaste\", \"GMP & ISO Certified Manufacturing Facilities\", \"Extensive Distribution Network across Bangladesh & South Asia\", \"Dermatologically Tested Formulae\"]"
                    },
                    new Division
                    {
                        Name = "Keya Agro Process Ltd",
                        Slug = "keya-agro-process-ltd",
                        Category = "cosmetics",
                        Subtitle = "AGRO & ORGANIC PROCESSING",
                        Description = "Focuses on sustainable agro-processing, natural botanicals, essential oils, and organic agricultural ingredients for cosmetics and health products.",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC4671.jpg",
                        KeyFeaturesJson = "[\"Natural Herbal Extract Processing\", \"Zero Chemical Additives Policy\", \"Direct Sourcing from Local Organic Farmers\"]"
                    }
                };

                await context.Divisions.AddRangeAsync(divisions);
            }

            if (!await context.Products.AnyAsync())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "Keya Super Lemon Soap",
                        Category = "cosmetics",
                        CategoryLabel = "Cosmetics & Toiletries",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg",
                        Description = "Refreshing citrus beauty soap enriched with natural lemon extracts and moisturizing oils for vibrant, glowing skin.",
                        WeightOrSize = "100g / 150g",
                        Badge = "Best Seller",
                        Price = 120.00m,
                        PriceFormatted = "৳ 120 / Pack (4 Bars)"
                    },
                    new Product
                    {
                        Name = "Keya Premium Knitwear & Shirts",
                        Category = "textiles",
                        CategoryLabel = "RMG & Textiles",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg",
                        Description = "High-quality 100% combed cotton polo shirts, hoodies, pullovers, and casual wear manufactured for top global retail brands.",
                        Badge = "Global Export",
                        Price = 650.00m,
                        PriceFormatted = "৳ 650 / Piece"
                    },
                    new Product
                    {
                        Name = "Men's Classic Polo Shirt",
                        Category = "textiles",
                        CategoryLabel = "RMG & Textiles",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/Mens-Polo-Shirt-1-1400x800-1.png",
                        Description = "Ergonomically tailored pique knit polo shirt featuring anti-pilling ring-spun cotton fabric with double-stitched hemline.",
                        WeightOrSize = "Sizes S - 3XL",
                        Price = 450.00m,
                        PriceFormatted = "৳ 450 / Piece"
                    },
                    new Product
                    {
                        Name = "Pullover Fleece Sweatshirt",
                        Category = "textiles",
                        CategoryLabel = "RMG & Textiles",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/Pullover-Sweat-Shirt-1400x800-1.png",
                        Description = "Ultra-warm heavy fleece sweatshirt with ribbed cuffs and neckband designed for international winter apparel lines.",
                        WeightOrSize = "Sizes S - XXL",
                        Price = 850.00m,
                        PriceFormatted = "৳ 850 / Piece"
                    },
                    new Product
                    {
                        Name = "Women's Fitted Polo Shirt",
                        Category = "textiles",
                        CategoryLabel = "RMG & Textiles",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/Womens-Polo-Shirt-1400x800-1.png",
                        Description = "Elegantly shaped 100% soft-touch cotton polo shirt engineered for maximum comfort and style durability.",
                        WeightOrSize = "Sizes XS - XL",
                        Price = 420.00m,
                        PriceFormatted = "৳ 420 / Piece"
                    },
                    new Product
                    {
                        Name = "Keya Pure Petroleum Jelly",
                        Category = "cosmetics",
                        CategoryLabel = "Cosmetics & Toiletries",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3778.jpg",
                        Description = "100% triple-purified skin protectant jelly designed to heal dry skin, chapped lips, and minor scrapes.",
                        WeightOrSize = "50ml / 100ml / 250ml",
                        Price = 180.00m,
                        PriceFormatted = "৳ 180 / 250ml Jar"
                    },
                    new Product
                    {
                        Name = "Keya Herbal Toothpaste",
                        Category = "cosmetics",
                        CategoryLabel = "Cosmetics & Toiletries",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3752.jpg",
                        Description = "Fluoride-balanced herbal oral care toothpaste enriched with clove oil and natural mint for total gum defense.",
                        WeightOrSize = "100g / 200g",
                        Price = 85.00m,
                        PriceFormatted = "৳ 85 / 200g Tube"
                    },
                    new Product
                    {
                        Name = "Keya Super Lemon Laundry Powder",
                        Category = "cosmetics",
                        CategoryLabel = "Cosmetics & Toiletries",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/DSC3411.jpg",
                        Description = "Advanced stain-fighting detergent powder with lemon freshness that preserves garment color and fiber texture.",
                        WeightOrSize = "500g / 1kg / 2kg",
                        Price = 160.00m,
                        PriceFormatted = "৳ 160 / 1kg Pack"
                    }
                };

                await context.Products.AddRangeAsync(products);
            }

            if (!await context.NewsArticles.AnyAsync())
            {
                var news = new List<NewsArticle>
                {
                    new NewsArticle
                    {
                        Title = "Keya Group Expands Export Footprint across European Markets",
                        Date = "May 14, 2026",
                        Category = "Corporate Growth",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/rmg.jpg",
                        Summary = "Keya Group announces a strategic partnership expansion with European garment distributors, boosting knitwear export volumes by 25% for the upcoming fiscal quarter."
                    },
                    new NewsArticle
                    {
                        Title = "Keya Cosmetics Upgrades Manufacturing Facility with Solar Energy Integration",
                        Date = "April 02, 2026",
                        Category = "Sustainability",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/2-Keya-Super-Lemon-Soap-2.jpg",
                        Summary = "In alignment with sustainable green energy goals, Keya Cosmetics Ltd has commissioned a 3.5MW rooftop solar power plant at its Gazipur facility."
                    },
                    new NewsArticle
                    {
                        Title = "Keya Group Awarded National Quality Excellence Certificate",
                        Date = "January 20, 2026",
                        Category = "Awards",
                        ImageUrl = "https://keyagroupbd.com/wp-content/uploads/2020/12/spinning-mill.jpg",
                        Summary = "Recognizing outstanding compliance, eco-friendly textile processing, and workplace safety, Keya Group received top honours at the Annual Bangladesh Industrial Summit."
                    }
                };

                await context.NewsArticles.AddRangeAsync(news);
            }

            if (!await context.JobOpenings.AnyAsync())
            {
                var jobs = new List<JobOpening>
                {
                    new JobOpening
                    {
                        Title = "Senior Textile Merchandiser",
                        Department = "RMG & Textiles Division",
                        Location = "Gazipur, Bangladesh",
                        Type = "Full-Time",
                        Deadline = "September 15, 2026",
                        Description = "Seeking an experienced Merchandiser to manage European retail client accounts, oversee order execution, sample approvals, and production timelines."
                    },
                    new JobOpening
                    {
                        Title = "Quality Assurance Manager (Cosmetics)",
                        Department = "Keya Cosmetics Ltd",
                        Location = "Konabari, Gazipur",
                        Type = "Full-Time",
                        Deadline = "September 30, 2026",
                        Description = "Lead the QA & QC laboratory team, ensure compliance with ISO 22716 & GMP standards, and supervise batch testing of soaps and personal care items."
                    },
                    new JobOpening
                    {
                        Title = "Spinning Mill Shift Engineer",
                        Department = "Keya Spinning Mills",
                        Location = "Jarun, Gazipur",
                        Type = "Full-Time",
                        Deadline = "October 10, 2026",
                        Description = "Oversee mechanical maintenance and smooth round-the-clock operation of high-speed ring spinning frames and yarn carding equipment."
                    }
                };

                await context.JobOpenings.AddRangeAsync(jobs);
            }

            if (!await context.ContactInquiries.AnyAsync())
            {
                var inquiries = new List<ContactInquiry>
                {
                    new ContactInquiry
                    {
                        Name = "Tariq Hasan",
                        Email = "tariq@trade.com",
                        Message = "Inquiring about bulk export order for Keya Super Lemon Soap to UK.",
                        SubmittedAt = DateTime.UtcNow.AddDays(-2),
                        Status = "Pending"
                    },
                    new ContactInquiry
                    {
                        Name = "Elena Rostova",
                        Email = "elena@europe-textiles.eu",
                        Message = "Requesting sample swatches for Men's Classic Polo Shirts.",
                        SubmittedAt = DateTime.UtcNow.AddDays(-1),
                        Status = "Pending"
                    }
                };

                await context.ContactInquiries.AddRangeAsync(inquiries);
            }

            if (!await context.ProductInquiries.AnyAsync())
            {
                var productQueries = new List<ProductInquiry>
                {
                    new ProductInquiry
                    {
                        ProductId = "1",
                        ProductName = "Keya Super Lemon Soap",
                        CustomerName = "Tanvir Ahmed",
                        CustomerEmail = "tanvir@supermarket-chain.bd",
                        CustomerPhone = "+8801712998877",
                        Quantity = "5,000 Cartons (150g)",
                        Notes = "Looking for wholesale supply quote for superstore distribution in Dhaka & Chittagong.",
                        SubmittedAt = DateTime.UtcNow.AddDays(-1),
                        Status = "Pending"
                    },
                    new ProductInquiry
                    {
                        ProductId = "3",
                        ProductName = "Men's Classic Polo Shirt",
                        CustomerName = "Marcus Vance",
                        CustomerEmail = "marcus@euro-apparel.co.uk",
                        CustomerPhone = "+447911123456",
                        Quantity = "2,500 Pieces (Assorted Sizes S-XXL)",
                        Notes = "Export price quotation required with OEM custom logo tag stitching.",
                        SubmittedAt = DateTime.UtcNow.AddHours(-12),
                        Status = "Pending"
                    }
                };

                await context.ProductInquiries.AddRangeAsync(productQueries);
            }

            await context.SaveChangesAsync();
        }
    }
}
