using Calendar.Controllers.RequestBodies;
using ErrorOr;

namespace Calendar.Models;

public class CalendarEvent
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

    // Owner?
    // Category?

    private CalendarEvent(
        Guid id,
        string name,
        DateTime startDateTime,
        DateTime endDateTime
    )
    {
        Id = id;
        Name = name;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
    }

    public void CopyPropertiesFrom(EventControllerUpdateBody newValues)
    {
        // Update values if provided value is not null.
        Name = newValues.Name ?? Name;
        StartDateTime = newValues.StartDateTime ?? StartDateTime;
        EndDateTime = newValues.EndDateTime ?? EndDateTime;
    }

    public static ErrorOr<CalendarEvent> Create(
        Guid id,
        string name,
        DateTime startDateTime,
        DateTime endDateTime
    )
    {
        bool endIsAfterStart = startDateTime < endDateTime;

        bool isValid =
            endIsAfterStart;

        if (!isValid)
        {
            return Error.Validation();
        }
        return new CalendarEvent(id, name, startDateTime, endDateTime);
    }
}
