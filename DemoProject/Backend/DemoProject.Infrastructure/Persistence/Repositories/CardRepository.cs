using DemoProject.Domain.Entities;
using DemoProject.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DemoProject.Infrastructure.Persistence.Repositories
{
    public class CardRepository : ICardRepository
    {
        private readonly ApplicationDbContext _context;

        public CardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Card>> GetAllAsync()
        {
            return await _context.Cards.OrderBy(c => c.Id).ToListAsync();
        }

        public async Task<Card> GetByIdAsync(int id)
        {
            return await _context.Cards.FindAsync(id);
        }

        public async Task<int> AddAsync(Card card)
        {
            await _context.Cards.AddAsync(card);
            await _context.SaveChangesAsync();
            return card.Id;
        }

        public async Task UpdateAsync(Card card)
        {
            _context.Cards.Update(card);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card != null)
            {
                _context.Cards.Remove(card);
                await _context.SaveChangesAsync();
            }
        }
    }
} 