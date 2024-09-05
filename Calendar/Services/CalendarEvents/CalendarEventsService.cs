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

    public ErrorOr<List<CalendarEvent>> GetAllCalendarEvents(
        DateTime? after,
        DateTime? before
    )
    {
        List<CalendarEvent> events = [];

        foreach (CalendarEvent calendarEvent in _events)
        {
            bool isBeforeValidRange =
                after != null && calendarEvent.EndDateTime < after;
            bool isAfterValidRange =
                before != null && calendarEvent.StartDateTime > before;

            if (isBeforeValidRange || isAfterValidRange)
            {
                continue;
            }

            events.Add(calendarEvent);
        }

        return events;
    }

    public ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent)
    {
        _events.Add(calendarEvent);
        return Result.Updated;
    }
}
