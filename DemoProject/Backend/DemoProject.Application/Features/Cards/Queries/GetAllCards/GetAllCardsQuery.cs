using DemoProject.Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace DemoProject.Application.Features.Cards.Queries.GetAllCards
{
    public class GetAllCardsQuery : IRequest<List<Card>>
    {
    }
} 