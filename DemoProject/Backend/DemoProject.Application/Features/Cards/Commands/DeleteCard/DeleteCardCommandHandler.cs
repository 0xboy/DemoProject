using DemoProject.Application.Interfaces.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Cards.Commands.DeleteCard
{
    public class DeleteCardCommandHandler : IRequestHandler<DeleteCardCommand>
    {
        private readonly ICardRepository _cardRepository;

        public DeleteCardCommandHandler(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task Handle(DeleteCardCommand request, CancellationToken cancellationToken)
        {
            await _cardRepository.DeleteAsync(request.Id);
        }
    }
} 