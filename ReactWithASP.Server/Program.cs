using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MvcPortfolio.Data;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MvcPortfolioContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MvcPortfolioContext") ?? throw new InvalidOperationException("Connection string 'MvcPortfolioContext' not found.")));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
