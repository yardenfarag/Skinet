using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            // _context = context;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            if (_context.Products == null)
            {
                return new List<Product>();
            }
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            // if (_context == null)
            // {
            //     throw new Exception("StoreContext is null");
            // }
            if (_context.Products == null)
            {
                throw new Exception("Products is null");
            }

            // return await _context.Products.FindAsync(id);

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            return product;
        }
    }
}
