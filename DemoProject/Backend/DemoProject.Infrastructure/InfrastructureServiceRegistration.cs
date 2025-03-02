using DemoProject.Application.Interfaces.Repositories;
using DemoProject.Infrastructure.Persistence;
using DemoProject.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DemoProject.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("DemoProject.Infrastructure")));

            services.AddScoped<ICardRepository, CardRepository>();

            return services;
        }
    }
}