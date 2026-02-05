using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MvcPortfolio.Data
{
    public class MvcPortfolioContext : DbContext
    {
        public MvcPortfolioContext (DbContextOptions<MvcPortfolioContext> options)
            : base(options)
        {
        }

        //public DbSet<ReactWithASP.Server.Ticker> Ticker { get; set; } = default!;

        public DbSet<ReactWithASP.Server.Exchange> Exchange { get; set; } = default!;
        public DbSet<ReactWithASP.Server.Ticker> Ticker { get; set; } = default!;
        public DbSet<ReactWithASP.Server.Transaction> Transaction { get; set; } = default!;
        //public DbSet<ReactWithASP.Server.Transaction> Transaction { get; set; } = default!;


    }
}
