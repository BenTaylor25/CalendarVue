
namespace Calendar.Controllers.RequestBodies;

public class EventControllerAddBody(
    string name,
    DateTime startDateTime,
    DateTime endDateTime
)
{
    public string Name { get; set; } = name;
    public DateTime StartDateTime { get; set; } = startDateTime;
    public DateTime EndDateTime { get; set; } = endDateTime;
}
