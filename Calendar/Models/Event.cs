
namespace Calendar.Models;

public class Event
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

    // Owner?
    // Category?
}
