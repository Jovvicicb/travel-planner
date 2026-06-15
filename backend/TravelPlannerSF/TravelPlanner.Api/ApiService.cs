using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using System.Text;
using TravelPlanner.Api.Extensions;


namespace TravelPlanner.Api
{
    internal sealed class ApiService : StatelessService
    {
        public ApiService(StatelessServiceContext context)
            : base(context)
        { }
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new ServiceInstanceListener[]
            {
                new ServiceInstanceListener(serviceContext =>
                    new KestrelCommunicationListener(serviceContext, "ServiceEndpoint", (url, listener) =>
                    {
                        ServiceEventSource.Current.ServiceMessage(serviceContext, $"Starting Kestrel on {url}");

                        var builder = WebApplication.CreateBuilder();

                        builder.Services.AddSingleton<StatelessServiceContext>(serviceContext);
                        builder.WebHost
                                    .UseKestrel()
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                                    .UseUrls(url);
                        builder.Services.AddControllers();

                        builder.Configuration
                            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                            .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);

                        var jwtSection = builder.Configuration.GetSection("Jwt");
                        var secret = jwtSection["Secret"];

                        builder.Services
                            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(options =>
                            {
                                options.TokenValidationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuer = true,
                                    ValidateAudience = true,
                                    ValidateLifetime = true,
                                    ValidateIssuerSigningKey = true,
                                    ValidIssuer = jwtSection["Issuer"],
                                    ValidAudience = jwtSection["Audience"],
                                    IssuerSigningKey = new SymmetricSecurityKey(
                                        Encoding.UTF8.GetBytes(secret!)
                                    )
                                };
                            });

                        builder.Services.AddAuthorization();

                        builder.Services.AddEndpointsApiExplorer();
                        builder.Services.AddSwaggerGen(options =>
                        {
                            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                            {
                                Name = "Authorization",
                                Type = SecuritySchemeType.Http,
                                Scheme = "Bearer",
                                BearerFormat = "JWT",
                                In = ParameterLocation.Header,
                                Description = "Enter JWT token."
                            });

                            options.AddSecurityRequirement(new OpenApiSecurityRequirement
                            {
                                {
                                    new OpenApiSecurityScheme
                                    {
                                        Reference = new OpenApiReference
                                        {
                                            Type = ReferenceType.SecurityScheme,
                                            Id = "Bearer"
                                        }
                                    },
                                    Array.Empty<string>()
                                }
                            });
                        });

                        var app = builder.Build(); 

                        app.UseGlobalExceptionHandler();

                        if (app.Environment.IsDevelopment())
                        {
                            app.UseSwagger();
                            app.UseSwaggerUI();
                        }

                        app.UseAuthentication();
                        app.UseAuthorization();

                        app.MapControllers();
                        
                        return app;

                    }))
            };
        }
    }
}
