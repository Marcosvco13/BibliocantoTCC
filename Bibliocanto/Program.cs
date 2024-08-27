using Bibliocanto.Context;
using Microsoft.EntityFrameworkCore;
using Bibliocanto.Services;
using Bibliocanto.Repository;
using Bibliocanto.IServices;
using Bibliocanto.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//String de conexão com o banco de dados
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaulConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IAuthenticate, AuthenticateService>();

builder.Services.AddScoped<ILivrosService, LivrosService>();
builder.Services.AddScoped<ILivrosRepository, LivrosRepository>();

builder.Services.AddScoped<IAutoresRepository, AutoresRepository>();
builder.Services.AddScoped<IAutoresService, AutoresServices>();

builder.Services.AddScoped<IGenerosRepository, GenerosRepository>();
builder.Services.AddScoped<IGenerosService, GenerosServices>();

builder.Services.AddScoped<IEditorasRepository, EditorasRepository>();
builder.Services.AddScoped<IEditorasService, EditorasServices>();

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();