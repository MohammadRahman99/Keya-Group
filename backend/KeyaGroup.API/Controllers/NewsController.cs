using Microsoft.AspNetCore.Mvc;
using KeyaGroup.API.Entities;
using KeyaGroup.API.Repositories;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public NewsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsArticle>>> GetNews()
        {
            var articles = await _unitOfWork.NewsArticles.GetAllAsync();
            return Ok(articles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NewsArticle>> GetNewsById(int id)
        {
            var article = await _unitOfWork.NewsArticles.GetByIdAsync(id);
            if (article == null) return NotFound(new { message = $"News article with ID {id} not found." });

            return Ok(article);
        }
    }
}
