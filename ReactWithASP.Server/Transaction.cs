using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactWithASP.Server
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string TickerString { get; set; }
        public decimal Quantity { get; set; }
        public decimal Cost { get; set; }
        public Boolean Buy { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }
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