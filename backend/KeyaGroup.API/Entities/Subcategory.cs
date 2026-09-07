using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace KeyaGroup.API.Entities
{
    public class Subcategory
    {
        [Key]
        public int Id { get; set; }

        public int CategoryId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; } = string.Empty;

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
