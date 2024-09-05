using ErrorOr;

using Calendar.Models;

namespace Calendar.Services.CalendarEvents;

public interface ICalendarEventsService
{
    ErrorOr<List<CalendarEvent>> GetAllCalendarEvents(
        DateTime? after,
        DateTime? before
    );

    ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent);
}
