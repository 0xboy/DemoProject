using MediatR;

namespace DemoProject.Application.Features.Cards.Commands.UpdateCard
{
    public class UpdateCardCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
} 