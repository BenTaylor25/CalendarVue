using ErrorOr;

using Calendar.Models;

namespace Calendar.Services.CalendarEvents;

public class CalendarEventsService : ICalendarEventsService
{
    // Database reference?
    private List<CalendarEvent> _events;

    public CalendarEventsService()
    {
        _events = [];
    }

    public ErrorOr<CalendarEvent> GetCalendarEvent(string calendarId)
    {
        return Error.NotFound();
    }

    public ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent)
    {
        _events.Add(calendarEvent);
        return Result.Updated;
    }
}
