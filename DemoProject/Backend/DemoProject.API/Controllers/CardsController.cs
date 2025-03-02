using DemoProject.Application.Features.Cards.Commands.CreateCard;
using DemoProject.Application.Features.Cards.Commands.DeleteCard;
using DemoProject.Application.Features.Cards.Commands.UpdateCard;
using DemoProject.Application.Features.Cards.Queries.GetAllCards;
using DemoProject.Application.Features.Cards.Queries.GetCardById;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DemoProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CardsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cards = await _mediator.Send(new GetAllCardsQuery());
            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var card = await _mediator.Send(new GetCardByIdQuery { Id = id });
            
            if (card == null)
                return NotFound();
                
            return Ok(card);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCardCommand command)
        {
            var cardId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = cardId }, cardId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCardCommand command)
        {
            command.Id = id;
            await _mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteCardCommand { Id = id });
            return NoContent();
        }
    }
} 