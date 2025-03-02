using DemoProject.Application.Interfaces.Repositories;
using DemoProject.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Cards.Queries.GetCardById
{
    public class GetCardByIdQueryHandler : IRequestHandler<GetCardByIdQuery, Card>
    {
        private readonly ICardRepository _cardRepository;

        public GetCardByIdQueryHandler(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task<Card> Handle(GetCardByIdQuery request, CancellationToken cancellationToken)
        {
            return await _cardRepository.GetByIdAsync(request.Id);
        }
    }
} 