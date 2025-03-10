using DemoProject.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Auth.Commands
{
    public class RegisterCommand : IRequest<AuthResult>
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResult>
    {
        private readonly IAuthService _authService;

        public RegisterCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<AuthResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return await _authService.RegisterAsync(request.Username, request.Email, request.Password);
        }
    }
} 