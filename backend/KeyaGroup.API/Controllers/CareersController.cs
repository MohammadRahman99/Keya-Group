using Microsoft.AspNetCore.Mvc;
using KeyaGroup.API.DTOs;
using KeyaGroup.API.Entities;
using KeyaGroup.API.Repositories;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CareersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CareersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("jobs")]
        public async Task<ActionResult<IEnumerable<JobOpening>>> GetJobs()
        {
            var jobs = await _unitOfWork.JobOpenings.GetAllAsync();
            return Ok(jobs);
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForJob([FromBody] CreateJobApplicationDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var application = new JobApplication
            {
                JobOpeningId = dto.JobOpeningId,
                ApplicantName = dto.ApplicantName,
                ApplicantEmail = dto.ApplicantEmail,
                ApplicantPhone = dto.ApplicantPhone,
                Notes = dto.Notes,
                AppliedAt = DateTime.UtcNow
            };

            await _unitOfWork.JobApplications.AddAsync(application);
            await _unitOfWork.CompleteAsync();

            return Ok(new { message = "Job application submitted successfully!", applicationId = application.Id });
        }

        [HttpGet("applications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetApplications()
        {
            var apps = await _unitOfWork.JobApplications.GetAllAsync();
            return Ok(apps);
        }
    }
}
