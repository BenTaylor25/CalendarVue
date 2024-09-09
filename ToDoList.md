# To Do List:

## Frontend
- Account Handling.
- Display Events according to UTC time rather than local time?

### Zoom
- Maintain centre point on zoom in and out.

### Display
- Remove '24:00' label from view (like 00:00) so that 24 boxes are shown instead of 25.
- Handle multi-day events by placing a CalendarEvent instance on each day.
- Handle parallel events.

### Tooltips
- Add tooltips to Month view
  - Show date of hover selection.

## Backend
- Store Events to Database
  - SQLite or Postgres?
- Account Handling.

## ICS Processor
- Import events from .ics file.
- Export events to .ics file.
