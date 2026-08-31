using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.Entities
{
    public class JobOpening
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Department { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Deadline { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
