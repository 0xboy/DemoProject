using DemoProject.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoProject.Application.Interfaces.Repositories
{
    public interface ICardRepository
    {
        Task<List<Card>> GetAllAsync();
        Task<Card> GetByIdAsync(int id);
        Task<int> AddAsync(Card card);
        Task UpdateAsync(Card card);
        Task DeleteAsync(int id);
    }
} 