using Microsoft.AspNetCore.Mvc;
using KeyaGroup.API.Entities;
using KeyaGroup.API.Repositories;

namespace KeyaGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] string? category, [FromQuery] string? search)
        {
            IEnumerable<Product> products;

            if (!string.IsNullOrWhiteSpace(search))
            {
                products = await _unitOfWork.Products.SearchProductsAsync(search);
            }
            else if (!string.IsNullOrWhiteSpace(category))
            {
                products = await _unitOfWork.Products.GetProductsByCategoryAsync(category);
            }
            else
            {
                products = await _unitOfWork.Products.GetAllAsync();
            }

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product == null) return NotFound(new { message = $"Product with ID {id} not found." });

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id) return BadRequest(new { message = "ID mismatch." });

            var existing = await _unitOfWork.Products.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Name = product.Name;
            existing.Category = product.Category;
            existing.CategoryLabel = product.CategoryLabel;
            existing.ImageUrl = product.ImageUrl;
            existing.Description = product.Description;
            existing.WeightOrSize = product.WeightOrSize;
            existing.Badge = product.Badge;

            _unitOfWork.Products.Update(existing);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product == null) return NotFound();

            _unitOfWork.Products.Delete(product);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
