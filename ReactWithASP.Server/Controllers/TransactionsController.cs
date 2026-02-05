using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcPortfolio.Data;
using System;

namespace ReactWithASP.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly MvcPortfolioContext _context;

        public TransactionsController(MvcPortfolioContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetTransactions")]
        public async Task<ActionResult<IEnumerable<Transaction>>> Get()
        {
            var tickers = await _context.Transaction.ToArrayAsync();

            return Ok(tickers);
        }

        [HttpPost("AddRow")]
        public async Task<ActionResult<IEnumerable<Transaction>>> AddRow(Transaction row)
        {
            //var tickers = await _context.Transaction.ToArrayAsync();
            var transaction = new Transaction();
            await _context.Transaction.AddAsync(transaction);

            transaction.Id = row.Id;
            transaction.TickerString = row.TickerString;
            transaction.Quantity = row.Quantity;
            transaction.Buy = row.Buy;
            transaction.Cost = row.Cost;
            transaction.Price = row.Price;
            transaction.Date = row.Date;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("DeleteRow/{rowID}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> DeleteRow(int rowID)
        {
            var transaction = await _context.Transaction.FindAsync(rowID);

            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transaction.Remove(transaction);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTransaction(
        int id,
        [FromBody] TransactionPatchDto patch)
        {
            var transaction = await _context.Transaction.FindAsync(id);

            if (transaction == null)
                return NotFound();

            // Apply only provided fields
            if (patch.TickerString != null)
                transaction.TickerString = patch.TickerString;

            if (patch.Quantity.HasValue)
                transaction.Quantity = patch.Quantity.Value;

            if (patch.Cost.HasValue)
                transaction.Cost = patch.Cost.Value;

            if (patch.Buy.HasValue)
                transaction.Buy = patch.Buy.Value;

            if (patch.Price.HasValue)
                transaction.Price = patch.Price.Value;

            if (patch.Date != null)
                transaction.Date = DateTime.Parse(patch.Date);

            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        public class TransactionPatchDto
        {
            public string? TickerString { get; set; }
            public decimal? Quantity { get; set; }
            public decimal? Cost { get; set; }
            public Boolean? Buy { get; set; }

            public string? Date { get; set; }

            public decimal? Price { get; set; }
        }
    }
}
