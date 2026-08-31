using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.DTOs
{
    public class CreateJobApplicationDto
    {
        [Required]
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
    }
}
