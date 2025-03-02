using DemoProject.Domain.Entities;
using MediatR;

namespace DemoProject.Application.Features.Cards.Queries.GetCardById
{
    public class GetCardByIdQuery : IRequest<Card>
    {
        public int Id { get; set; }
    }
} 