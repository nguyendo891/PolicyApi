using Microsoft.EntityFrameworkCore;
using ReceiptCookbookApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBookApi.Model
{
    public class CookBookDbContext:DbContext
    {
        public DbSet<Policy> Policies { get; set; }

        public DbSet<User> Users { get; set; }
        public CookBookDbContext(DbContextOptions<CookBookDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubPolicy>()
                .HasOne(p => p.Policy)
                .WithMany(x=>x.SubPolicies)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
