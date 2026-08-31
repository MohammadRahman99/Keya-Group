using Microsoft.AspNetCore.Mvc;
using KeyaGroup.API.Entities;
using KeyaGroup.API.Repositories;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DivisionsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DivisionsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Division>>> GetDivisions()
        {
            var divisions = await _unitOfWork.Divisions.GetAllAsync();
            return Ok(divisions);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<Division>> GetDivisionBySlug(string slug)
        {
            var divisions = await _unitOfWork.Divisions.FindAsync(d => d.Slug.ToLower() == slug.ToLower());
            var division = divisions.FirstOrDefault();

            if (division == null) return NotFound(new { message = $"Division with slug '{slug}' not found." });
            return Ok(division);
        }
    }
}
