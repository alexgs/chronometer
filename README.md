# Chronometer

A simple time-tracking app, modeled after BubbleTimer.

## Branch `deprecated/grid-highlighting`

This branch exists for historical reasons, as a record of a thing that I tried, and it did not work.

I experimented for a while with rendering the chart using CSS grid. It worked until I tried to implement highlighting of rows and columns on mouse-over. Since there are no rows and columns in CSS, I had to implement this with a JavaScript solution.

Bottom line: It is super janky.

## To Do

- [ ] Highlight rows on mouse-over
- [ ] Better padding for activity-name cells
- [ ] Custom scrolling for the grid
- [ ] Reorder activities
- [ ] Add/remove/edit activities
- [ ] Pretty checkboxes
- [ ] Exceptions for DST, TZ changes, whatnot
- [ ] Login and authentication
- [ ] Backend

## Design Notes

[Color palette][1]

[1]: https://coolors.co/db85c9-253237-ef6461-e4b363-e8e9eb

- earth yellow: `#E4B363` `rgba(228, 179, 99, 1)`
- gunmetal: `#253237` `rgba(37, 50, 55, 1)`
- middle purple: `#DB85C9` `rgba(219, 133, 201, 1)`
- pastel red: `#EF6461` `rgba(239, 100, 97, 1)`
- platinum: `#E8E9EB` `rgba(232, 233, 235, 1)`
