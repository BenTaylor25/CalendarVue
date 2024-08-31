
namespace Calendar.Controllers;

public class EventController : AppBaseController
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }
}
