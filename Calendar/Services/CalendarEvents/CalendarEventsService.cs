using ErrorOr;

using Calendar.Models;
using Microsoft.AspNetCore.Http.HttpResults;

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

    public ErrorOr<CalendarEvent> GetCalendarEventById(
        Guid calendarId
    )
    {
        foreach (CalendarEvent calendarEvent in _events)
        {
            if (calendarEvent.Id == calendarId)
            {
                return calendarEvent;
            }
        }

        return Error.NotFound();
    }

    public ErrorOr<Updated> AddCalendarEvent(CalendarEvent calendarEvent)
    {
        _events.Add(calendarEvent);
        return Result.Updated;
    }

    public ErrorOr<Updated> UpdateCalendarEvent(
        Guid eventId,
        CalendarEvent calendarEvent
    )
    {
        ErrorOr<CalendarEvent> getEventResult =
            GetCalendarEventById(eventId);

        if (getEventResult.IsError)
        {
            return Error.NotFound();
        }

        CalendarEvent existingEvent = getEventResult.Value;

        existingEvent.CopyPropertiesFrom(calendarEvent);
        return Result.Updated;
    }
}
