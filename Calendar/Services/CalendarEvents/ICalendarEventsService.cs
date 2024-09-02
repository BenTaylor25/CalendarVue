using ErrorOr;

using Calendar.Models;

namespace Calendar.Services.CalendarEvents;

public interface ICalendarEventsService
{
    ErrorOr<CalendarEvent> GetCalendarEvent(string calendarId);
    ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent);
}
