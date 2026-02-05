using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactWithASP.Server
{
    public class Exchange
    {
        [Key]
        public int Id { get; set; }
        public string ExchangeString { get; set; }
        public string AVCode { get; set; }
        public string Currency { get; set; }
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