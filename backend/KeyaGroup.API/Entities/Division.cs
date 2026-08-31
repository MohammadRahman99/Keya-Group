using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.Entities
{
    public class Division
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty; // 'textiles' | 'cosmetics'

        [Required]
        [MaxLength(150)]
        public string Subtitle { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        public string KeyFeaturesJson { get; set; } = "[]";
    }
}
