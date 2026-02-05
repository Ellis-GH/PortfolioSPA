using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcPortfolio.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TickersController : ControllerBase
    {
        private readonly MvcPortfolioContext _context;

        public TickersController(MvcPortfolioContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetTickers")]
        public async Task<ActionResult<IEnumerable<Ticker>>> GetTickers()
        {
            var tickers = await _context.Ticker.ToArrayAsync();

            return Ok(tickers);
        }

        [HttpPost("AddRow")]
        public async Task<ActionResult<IEnumerable<Ticker>>> AddRow(Ticker row)
        {
            var ticker = new Ticker
            {
                TickerString = row.TickerString
            };
            await _context.Ticker.AddAsync(ticker);

            ticker.ExchangeString = row.ExchangeString;
            ticker.Price = row.Price;
            ticker.Name = row.Name;
            ticker.Type = row.Type;
            ticker.LastUpdated = row.LastUpdated;
            ticker.RatioToOne = row.RatioToOne;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("DeleteRow/{rowID}")]
        public async Task<ActionResult<IEnumerable<Ticker>>> DeleteRow(int rowID)
        {
            var ticker = await _context.Ticker.FindAsync(rowID);

            if (ticker == null)
            {
                return NotFound();
            }

            _context.Ticker.Remove(ticker);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("TickerString")]
        public async Task<ActionResult<IEnumerable<Ticker>>> GetTickerStrings()
        {
            var tickerStrings = await _context.Ticker
                .Select(t => t.TickerString) // pick only the column you want
                .ToArrayAsync();
            
            return Ok(tickerStrings);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTicker(
        int id,
        [FromBody] TickerPatchDto patch)
        {
            var ticker = await _context.Ticker.FindAsync(id);

            if (ticker == null)
                return NotFound();

            // Apply only provided fields
            if (patch.TickerString != null)
                ticker.TickerString = patch.TickerString;

            if (patch.ExchangeString != null)
                ticker.ExchangeString = patch.ExchangeString;

            if (patch.Name != null)
                ticker.Name = patch.Name;

            if (patch.Type != null)
                ticker.Type = patch.Type;

            if (patch.RatioToOne.HasValue)
                ticker.RatioToOne = patch.RatioToOne.Value;

            if (patch.Price.HasValue)
                ticker.Price = patch.Price.Value;

            if (patch.LastUpdated != null)
                ticker.LastUpdated = DateTime.Parse(patch.LastUpdated);

            await _context.SaveChangesAsync();

            return Ok(ticker);
        }

        public class TickerPatchDto
        {
            public int? Id { get; set; }
            public string? TickerString { get; set; }
            public decimal? Price { get; set; }
            public string? LastUpdated { get; set; }
            public decimal? RatioToOne { get; set; }
            public string? ExchangeString { get; set; }
            public string? Name { get; set; }
            public string? Type { get; set; }
        }
    }
}
