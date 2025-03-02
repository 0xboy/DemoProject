using DemoProject.Domain.Entities;
using DemoProject.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Cards.Queries.GetAllCards
{
    public class GetAllCardsQueryHandler : IRequestHandler<GetAllCardsQuery, List<Card>>
    {
        private readonly ICardRepository _cardRepository;

        public GetAllCardsQueryHandler(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task<List<Card>> Handle(GetAllCardsQuery request, CancellationToken cancellationToken)
        {
            return await _cardRepository.GetAllAsync();
        }
    }
} 