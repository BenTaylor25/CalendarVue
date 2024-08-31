using Calendar.Models;

namespace Calendar.Services.Events;

public interface IEventService
{
    CalendarEvent GetEvent();
    void SetEvent(CalendarEvent calendarEvent);
}
