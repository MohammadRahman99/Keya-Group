using System.ComponentModel.DataAnnotations;

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

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
