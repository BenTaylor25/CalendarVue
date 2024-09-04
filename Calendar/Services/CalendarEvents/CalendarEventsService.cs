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

    public ErrorOr<List<CalendarEvent>> GetAllCalendarEvents()
    {
        return _events;
    }

    public ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent)
    {
        _events.Add(calendarEvent);
        return Result.Updated;
    }
}
