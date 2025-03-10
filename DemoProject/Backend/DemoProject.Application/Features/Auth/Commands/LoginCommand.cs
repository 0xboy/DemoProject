using DemoProject.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DemoProject.Application.Features.Auth.Commands
{
    public class LoginCommand : IRequest<AuthResult>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResult>
    {
        private readonly IAuthService _authService;

        public LoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<AuthResult> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            return await _authService.LoginAsync(request.Username, request.Password);
        }
    }
} 