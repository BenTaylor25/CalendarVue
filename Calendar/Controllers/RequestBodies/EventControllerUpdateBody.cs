
namespace Calendar.Controllers.RequestBodies;

public class EventControllerUpdateBody(
    Guid eventId,
    string? name,
    DateTime? startDateTime,
    DateTime? endDateTime
)
{
    public Guid EventId { get; set; } = eventId;
    public string? Name { get; set; } = name;
    public DateTime? StartDateTime { get; set; } = startDateTime;
    public DateTime? EndDateTime { get; set; } = endDateTime;
}
