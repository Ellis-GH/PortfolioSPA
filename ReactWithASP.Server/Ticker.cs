using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactWithASP.Server
{
    public class Ticker
    {
        public int Id { get; set; }
        public string TickerString { get; set; }
        public decimal Price { get; set; }
        public DateTime LastUpdated { get; set; }
        public decimal RatioToOne { get; set; }
        public string ExchangeString { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}

/*
public class MvcPortfolioContext : DbContext
{
    public MvcPortfolioContext(DbContextOptions<MvcPortfolioContext> options)
        : base(options)
    {
    }

    public DbSet<Exchange> Exchange { get; set; }
}
*/