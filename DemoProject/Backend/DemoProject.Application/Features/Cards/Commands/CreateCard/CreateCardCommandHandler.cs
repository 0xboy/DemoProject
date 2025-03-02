using DemoProject.Domain.Entities;
using DemoProject.Application.Interfaces.Repositories;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Cards.Commands.CreateCard
{
    public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, int>
    {
        private readonly ICardRepository _cardRepository;

        public CreateCardCommandHandler(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task<int> Handle(CreateCardCommand request, CancellationToken cancellationToken)
        {
            var card = new Card
            {
                Title = request.Title,
                Description = request.Description,
                CreatedDate = DateTime.UtcNow
            };

            return await _cardRepository.AddAsync(card);
        }
    }
} 