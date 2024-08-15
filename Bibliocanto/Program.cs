using Bibliocanto.Context;
using Microsoft.EntityFrameworkCore;
using Bibliocanto.Models;
using Bibliocanto.Services;
using Bibliocanto.Repository;
using Bibliocanto.IServices;
using Bibliocanto.IRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//String de conexão com o banco de dados
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaulConnection")));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ILivrosService, LivrosService>();
builder.Services.AddScoped<ILivrosRepository, LivrosRepository>();

builder.Services.AddScoped<IAutoresRepository, AutoresRepository>();
builder.Services.AddScoped<IAutoresService, AutoresServices>();

builder.Services.AddScoped<IGenerosRepository, GenerosRepository>();
builder.Services.AddScoped<IGenerosService, GenerosServices>();

builder.Services.AddScoped<IUnitOFWork, UnitOfWork>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();