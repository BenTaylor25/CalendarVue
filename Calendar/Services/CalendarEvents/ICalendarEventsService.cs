using ErrorOr;

using Calendar.Models;
using Calendar.Controllers.RequestBodies;

namespace Calendar.Services.CalendarEvents;

public interface ICalendarEventsService
{
    ErrorOr<List<CalendarEvent>> GetAllCalendarEvents(
        DateTime? after,
        DateTime? before
    );

    public ErrorOr<CalendarEvent> GetCalendarEventById(
        Guid eventId
    );

    ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent);

    ErrorOr<Updated> UpdateCalendarEvent(
        Guid eventId,
        EventControllerUpdateBody newValues
    );
}
