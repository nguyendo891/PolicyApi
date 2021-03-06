﻿// <auto-generated />
using System;
using CookBookApi.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CookBookApi.Migrations
{
    [DbContext(typeof(CookBookDbContext))]
    [Migration("20190802094750_ChangeIngredientToSubPolicy")]
    partial class ChangeIngredientToSubPolicy
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CookBookApi.Model.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<int>("ExpiresIn");

                    b.Property<string>("Password");

                    b.Property<bool?>("Registered");

                    b.Property<int>("Role");

                    b.Property<string>("Token");

                    b.Property<string>("UserTokenId");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ReceiptCookbookApi.Models.Policy", b =>
                {
                    b.Property<int>("PolicyId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("ImagePath")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("TokenId");

                    b.HasKey("PolicyId");

                    b.ToTable("Policies");
                });

            modelBuilder.Entity("ReceiptCookbookApi.Models.SubPolicy", b =>
                {
                    b.Property<int>("SubPolicyId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("PolicyId");

                    b.HasKey("SubPolicyId");

                    b.HasIndex("PolicyId");

                    b.ToTable("SubPolicy");
                });

            modelBuilder.Entity("ReceiptCookbookApi.Models.SubPolicy", b =>
                {
                    b.HasOne("ReceiptCookbookApi.Models.Policy", "Policy")
                        .WithMany("SubPolicies")
                        .HasForeignKey("PolicyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
