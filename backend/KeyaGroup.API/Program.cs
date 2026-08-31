using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Data;
using KeyaGroup.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add Services to DI Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? "Data Source=keyagroup.db";
builder.Services.AddDbContext<KeyaGroupDbContext>(options =>
    options.UseSqlite(connectionString));

// Register Repository Pattern & Unit of Work DI
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IContactInquiryRepository, ContactInquiryRepository>();

// Configure CORS for Angular Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

var app = builder.Build();

// Enable Swagger API Documentation
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Keya Group API v1");
    });
}

app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();

// Ensure Database Creation & Data Seeding on Startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<KeyaGroupDbContext>();
        await DataSeeder.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

app.Run();
