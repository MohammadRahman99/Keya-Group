using Microsoft.AspNetCore.Mvc;
using KeyaGroup.API.DTOs;
using KeyaGroup.API.Entities;
using KeyaGroup.API.Repositories;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContactController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInquiry([FromBody] CreateContactInquiryDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var inquiry = new ContactInquiry
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message,
                SubmittedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            await _unitOfWork.ContactInquiries.AddAsync(inquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new { message = "Contact inquiry submitted successfully!", inquiryId = inquiry.Id });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInquiry>>> GetInquiries()
        {
            var inquiries = await _unitOfWork.ContactInquiries.GetRecentInquiriesAsync();
            return Ok(inquiries);
        }
    }
}
