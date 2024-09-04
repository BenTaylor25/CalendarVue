using Calendar.Services.CalendarEvents;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddControllers();
    builder.Services.AddSingleton<ICalendarEventsService, CalendarEventsService>();
    builder.Services.Configure<IISServerOptions>(options =>
    {
        options.MaxRequestBodySize = 10 * 1024;   // 10 KB
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
    app.MapControllers();
}

app.Run();
