using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
    }
}
