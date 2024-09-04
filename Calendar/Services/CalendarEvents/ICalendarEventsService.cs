using ErrorOr;

using Calendar.Models;

namespace Calendar.Services.CalendarEvents;

public interface ICalendarEventsService
{
    ErrorOr<List<CalendarEvent>> GetAllCalendarEvents();
    ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent);
}
