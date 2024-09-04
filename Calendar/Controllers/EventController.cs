using Microsoft.AspNetCore.Mvc;

using ErrorOr;

using Calendar.Models;
using Calendar.Services.CalendarEvents;

namespace Calendar.Controllers;

public class EventController : AppBaseController
{
    private readonly ICalendarEventsService _eventService;

    public EventController(ICalendarEventsService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet("/calendarEvent")]
    public IActionResult GetAllCalendarEvents()
    {
        ErrorOr<List<CalendarEvent>> serviceResponse =
            _eventService.GetAllCalendarEvents();

        if (serviceResponse.IsError)
        {
            return Problem("Couldn't get Calendar Events.");
        }

        List<CalendarEvent> events = serviceResponse.Value;

        return Ok(events);
    }

    [HttpPost("/calendarEvent")]
    public IActionResult AddValue()
    {
        ErrorOr<CalendarEvent> calendarEventResult = CalendarEvent.Create(
            new Guid(),
            "test",
            new DateTime(2024, 9, 2, 15, 0, 0),
            new DateTime(2024, 9, 2, 18, 0, 0)
        );

        if (calendarEventResult.IsError)
        {
            return Problem("could not create object");
        }
        CalendarEvent calendarEvent = calendarEventResult.Value;

        ErrorOr<Updated> addValueResponse =
            _eventService.AddCalendarEvent(calendarEvent);
        
        if (addValueResponse.IsError)
        {
            return Problem("could not add event");
        }

        return Ok();
    }
}
