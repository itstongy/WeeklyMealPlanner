# Weekly Meal Planner

A lightweight, client-side meal planning site for two people (extendable), with attendance tracking, leftovers logic, suggestions, a meal library, and export options.

## Features
- Plan dinners for the next 7 days
- Track who is home each night and assume leftovers when someone is away
- Quick meal suggestions + personal meal library (import or add)
- Export your plan as JSON, CSV, or calendar (ICS)
- Local storage persistence in the browser

## Hosted Version
https://itstongy.github.io/WeeklyMealPlanner/

## Usage
Open `index.html` in any modern browser, or use the hosted version above.

## Project Structure
- `index.html` — layout and UI
- `styles.css` — visual design
- `app.js` — state, logic, exports

## Notes
This is a static frontend; no build step is required.

## Future Ideas (not implemented)
- Weekly templates (rotate favorite plans).
- Auto-leftovers math (carry servings forward).
- Export to a shared Google Calendar.
- Multi-week view with drag-and-drop.
- Shared meal ratings for both people.
