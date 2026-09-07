using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Data;
using KeyaGroup.API.DTOs;
using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductInquiriesController : ControllerBase
    {
        private readonly KeyaGroupDbContext _context;

        public ProductInquiriesController(KeyaGroupDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductInquiry([FromBody] CreateProductInquiryDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var inquiry = new ProductInquiry
            {
                ProductId = dto.ProductId,
                ProductName = dto.ProductName,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerPhone = dto.CustomerPhone,
                Quantity = dto.Quantity,
                Notes = dto.Notes,
                SubmittedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            await _context.ProductInquiries.AddAsync(inquiry);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product purchase query submitted successfully! Keya Group staff will contact you shortly.", inquiryId = inquiry.Id });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductInquiry>>> GetProductInquiries()
        {
            var inquiries = await _context.ProductInquiries
                .OrderByDescending(i => i.SubmittedAt)
                .ToListAsync();

            return Ok(inquiries);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInquiryStatusDto dto)
        {
            var inquiry = await _context.ProductInquiries.FindAsync(id);
            if (inquiry == null) return NotFound(new { message = $"Inquiry with ID {id} not found." });

            inquiry.Status = dto.Status;
            _context.ProductInquiries.Update(inquiry);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Product query status updated to '{dto.Status}'.", inquiry });
        }
    }
}
