using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.DTOs
{
    public class CreateProductInquiryDto
    {
        public string ProductId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Product Name is required")]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Your Name is required")]
        [MaxLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email Address is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MaxLength(150)]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone Number is required")]
        [MaxLength(50)]
        public string CustomerPhone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Quantity is required")]
        [MaxLength(100)]
        public string Quantity { get; set; } = string.Empty;

        public string? Notes { get; set; }
    }

    public class UpdateInquiryStatusDto
    {
        [Required]
        public string Status { get; set; } = "Contacted";
    }
}
