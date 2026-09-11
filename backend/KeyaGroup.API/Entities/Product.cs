using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeyaGroup.API.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty; // 'cosmetics' | 'textiles' | 'agro'

        [Required]
        [MaxLength(100)]
        public string CategoryLabel { get; set; } = string.Empty;

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? WeightOrSize { get; set; }

        public string? Badge { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } = 0;

        [MaxLength(100)]
        public string? PriceFormatted { get; set; } // e.g. "৳ 120 / Pack" or "৳ 1,500 / Carton"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
