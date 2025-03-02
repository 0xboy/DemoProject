using DemoProject.Application.Interfaces.Repositories;
using DemoProject.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Cards.Commands.UpdateCard
{
    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand>
    {
        private readonly ICardRepository _cardRepository;

        public UpdateCardCommandHandler(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task Handle(UpdateCardCommand request, CancellationToken cancellationToken)
        {
            var card = await _cardRepository.GetByIdAsync(request.Id);
            
            if (card != null)
            {
                card.Title = request.Title;
                card.Description = request.Description;
                
                await _cardRepository.UpdateAsync(card);
            }
        }
    }
} 