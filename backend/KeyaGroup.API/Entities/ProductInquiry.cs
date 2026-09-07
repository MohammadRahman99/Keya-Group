using System.ComponentModel.DataAnnotations;

namespace KeyaGroup.API.Entities
{
    public class ProductInquiry
    {
        [Key]
        public int Id { get; set; }

        public string ProductId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string CustomerPhone { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Quantity { get; set; } = string.Empty;

        public string? Notes { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // "Pending" | "Contacted" | "Completed"
    }
}
