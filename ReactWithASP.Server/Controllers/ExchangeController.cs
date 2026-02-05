using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcPortfolio.Data;
using System;

namespace ReactWithASP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExchangeController : ControllerBase
    {
        private readonly MvcPortfolioContext _context;

        public ExchangeController(MvcPortfolioContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetExchange")]
        public async Task<ActionResult<IEnumerable<Exchange>>> Get(int rows = 2)
        {
            var exchanges = await _context.Exchange.ToArrayAsync();

            return Ok(exchanges);
        }

        [HttpGet("ExchangeString")]
        public async Task<ActionResult<IEnumerable<Ticker>>> GetExchangeStrings()
        {
            var exchangeStrings = await _context.Exchange
                .Select(t => t.ExchangeString) // pick only the column you want
                .ToArrayAsync();

            return Ok(exchangeStrings);
        }

        [HttpPost("AddRow")]
        public async Task<ActionResult<IEnumerable<Exchange>>> AddRow(Exchange row)
        {
            var exchange = new Exchange();
            await _context.Exchange.AddAsync(exchange);

            exchange.Id = row.Id;
            exchange.ExchangeString = row.ExchangeString;
            exchange.AVCode = row.AVCode;
            exchange.Currency = row.Currency;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("DeleteRow/{rowID}")]
        public async Task<ActionResult<IEnumerable<Exchange>>> DeleteRow(int rowID)
        {
            var exchange = await _context.Exchange.FindAsync(rowID);

            if (exchange == null)
            {
                return NotFound();
            }

            _context.Exchange.Remove(exchange);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchExchange(
        int id,
        [FromBody] ExchangePatchDto patch)
        {
            var exchange = await _context.Exchange.FindAsync(id);

            if (exchange == null)
                return NotFound();

            // Apply only provided fields
            if (patch.ExchangeString != null)
                exchange.ExchangeString = patch.ExchangeString;

            if (patch.AVCode != null)
                exchange.AVCode = patch.AVCode;

            if (patch.Currency != null)
                exchange.Currency = patch.Currency;

            await _context.SaveChangesAsync();

            return Ok(exchange);
        }

        public class ExchangePatchDto
        {
            public string? ExchangeString { get; set; }
            public string? AVCode { get; set; }
            public string? Currency { get; set; }
        }
    }
}
