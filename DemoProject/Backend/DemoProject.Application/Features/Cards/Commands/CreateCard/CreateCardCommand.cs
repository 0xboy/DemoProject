using MediatR;
using System;

namespace DemoProject.Application.Features.Cards.Commands.CreateCard
{
    public class CreateCardCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
} 