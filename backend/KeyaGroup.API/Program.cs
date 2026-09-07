using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Data;
using KeyaGroup.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add Services to DI Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Microsoft SQL Server DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? "Server=DESKTOP-DMV5QRQ\\SQLEXPRESS;Database=KeyaGroupDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true";

builder.Services.AddDbContext<KeyaGroupDbContext>(options =>
    options.UseSqlServer(connectionString));

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

// Ensure Automatic Database Schema Creation & Data Seeding on Startup via EF Core
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        logger.LogInformation("[EF Core SQL Server] Connecting to DESKTOP-DMV5QRQ\\SQLEXPRESS and checking schema...");
        var context = services.GetRequiredService<KeyaGroupDbContext>();
        await DataSeeder.SeedAsync(context);
        logger.LogInformation("[EF Core SQL Server] Database 'KeyaGroupDb' and table schemas initialized successfully!");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "[EF Core Error] An error occurred while initializing SQL Server database schema.");
    }
}

app.Run();
