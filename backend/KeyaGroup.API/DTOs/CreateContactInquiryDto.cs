using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.DTOs
{
    public class CreateContactInquiryDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; } = string.Empty;
    }
}
