using Microsoft.AspNetCore.Mvc;

using ErrorOr;

using Calendar.Models;
using Calendar.Services.CalendarEvents;
using Calendar.Controllers.RequestBodies;
using Calendar.Controllers.RequestParameters;

namespace Calendar.Controllers;

public class EventController : AppBaseController
{
    private readonly ICalendarEventsService _eventService;

    public EventController(ICalendarEventsService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet("/calendarEvent")]
    public IActionResult GetAllCalendarEvents(
        [FromQuery] EventControllerGetAllParameters requestParameters
    )
    {
        ErrorOr<List<CalendarEvent>> serviceResponse =
            _eventService.GetAllCalendarEvents(
                requestParameters?.After,
                requestParameters?.Before
            );

        if (serviceResponse.IsError)
        {
            return Problem("Couldn't get Calendar Events.");
        }

        List<CalendarEvent> events = serviceResponse.Value;

        return Ok(events);
    }

    [HttpPost("/calendarEvent")]
    public IActionResult AddCalendarEvent(
        [FromBody] EventControllerAddBody requestBody
    )
    {
        ErrorOr<CalendarEvent> calendarEventResult = CalendarEvent.Create(
            new Guid(),
            requestBody.Name,
            requestBody.StartDateTime,
            requestBody.EndDateTime
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

    [HttpPut("/calendarEvent")]
    public IActionResult UpdateCalendarEvent(
        [FromBody] EventControllerUpdateBody requestBody
    )
    {
        ErrorOr<CalendarEvent> calendarEventResult = CalendarEvent.Create(
            requestBody.EventId,
            requestBody.Name,
            requestBody.StartDateTime,
            requestBody.EndDateTime
        );

        if (calendarEventResult.IsError)
        {
            return Problem("could not create object");
        }
        CalendarEvent calendarEvent = calendarEventResult.Value;

        ErrorOr<Updated> updateValueResponse =
            _eventService.UpdateCalendarEvent(
                requestBody.EventId,
                calendarEvent
            );

        if (updateValueResponse.IsError)
        {
            return Problem("could not update event");
        }
        return Ok();
    }
}
