using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CoreWebApi.Models.Data;
using CoreWebApi.Models;

namespace CoreWebApi.Context
{
    public partial class mytestdbContext : DbContext
    {
        public mytestdbContext()
        {
        }

        public mytestdbContext(DbContextOptions<mytestdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<EmployeeList> EmployeeList { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.DepartmentId);

                entity.ToTable("Department");

                entity.Property(e => e.DepartmentId).ValueGeneratedOnAdd();

                entity.Property(e => e.DepartmentName).HasMaxLength(500);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeId);

                entity.ToTable("Employee");

                entity.Property(e => e.DateOfJoining).HasColumnType("datetime");

                entity.Property(e => e.Department).HasMaxLength(500);

                entity.Property(e => e.EmployeeId).ValueGeneratedOnAdd();

                entity.Property(e => e.EmployeeName).HasMaxLength(500);

                entity.Property(e => e.PhotoFileName).HasMaxLength(500);
            });

            modelBuilder.Entity<EmployeeList>(entity => entity.HasNoKey());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
