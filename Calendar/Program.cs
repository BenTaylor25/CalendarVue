using Calendar.Constants;
using Calendar.Services.CalendarEvents;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddControllers();
    builder.Services
        .AddSingleton<ICalendarEventsService, CalendarEventsService>();
    builder.Services.Configure<IISServerOptions>(options =>
    {
        options.MaxRequestBodySize = Constants.API_REQUEST_MAX_BODY_SIZE;
    });
    builder.Services.AddCors(setup => {
        setup.AddDefaultPolicy(policyBuilder => {
            policyBuilder
                .WithOrigins(Constants.FRONTEND_URL)
                .WithMethods("GET", "POST", "PUT", "DELETE")
                .AllowAnyHeader();
        });
    });
}

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseCors();
    app.MapControllers();
}

app.Run();
