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

        List<CalendarEvent> calendarEvents = serviceResponse.Value;

        return Ok(calendarEvents);
    }

    [HttpGet("/calendarEvent/{id}")]
    public IActionResult GetCalendarEventById(Guid id)
    {
        ErrorOr<CalendarEvent> serviceResponse =
            _eventService.GetCalendarEventById(id);

        if (serviceResponse.IsError)
        {
            return Problem("Couldn't find event.");
        }

        CalendarEvent calendarEvent = serviceResponse.Value;

        return Ok(calendarEvent);
    }

    [HttpPost("/calendarEvent")]
    public IActionResult AddCalendarEvent(
        [FromBody] EventControllerAddBody requestBody
    )
    {
        ErrorOr<CalendarEvent> calendarEventResult = CalendarEvent.Create(
            Guid.NewGuid(),
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
        ErrorOr<Updated> serviceResponse =
            _eventService.UpdateCalendarEvent(
                requestBody.EventId,
                requestBody
            );

        if (serviceResponse.IsError)
        {
            return Problem("could not update event");
        }
        return Ok();
    }

    [HttpDelete("/calendarEvent/{id}")]
    public IActionResult DeleteCalendarEvent(Guid id)
    {
        ErrorOr<Deleted> serviceResponse =
            _eventService.DeleteCalendarEvent(id);

        if (serviceResponse.IsError)
        {
            return Problem("could not delete event");
        }
        return Ok();
    }
}
