using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.Entities
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }

        public int JobOpeningId { get; set; }

        [Required]
        [MaxLength(150)]
        public string ApplicantName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string ApplicantEmail { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string ApplicantPhone { get; set; } = string.Empty;

        public string? Notes { get; set; }

        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    }
}
