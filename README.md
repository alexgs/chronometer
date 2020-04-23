# Chronometer

A simple time-tracking app, modeled after BubbleTimer.

## To Do

- [x] Highlight rows on mouse-over
- [x] Better padding for activity-name cells
- [x] Custom scrolling for the grid
- [x] Pretty checkboxes
- [x] Add/remove/edit activities
- [ ] Support multiple/infinite days
- [ ] Reorder activities
- [ ] Exceptions for DST, TZ changes, whatnot
- [ ] Login and authentication
- [ ] Backend

**Future Work**

- [ ] Shift-click to select multiple segments in one row
- [ ] Scrolling improvements: Animation
  - [React Motion][3] is an option
  - [React Spring][4] is another
- [ ] Scrolling improvements: Button to move +/- 6 hours
- [ ] Dynamically change the number of hours displayed based on the screen width
- [ ] Ctrl-click to select multiple activities for the same segment

[3]: https://github.com/chenglou/react-motion
[4]: https://www.react-spring.io/

## Dev Setup

- Follow the [npm configuration instructions][2] for **Font Awesome Pro**.
- Generate static CSS files by running `npm run build:css`.

[2]: https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro

## Design Notes

[Color palette][1]

[1]: https://coolors.co/db85c9-253237-ef6461-e4b363-e8e9eb

- earth yellow: `#E4B363` `rgba(228, 179, 99, 1)`
- gunmetal: `#253237` `rgba(37, 50, 55, 1)`
- middle purple: `#DB85C9` `rgba(219, 133, 201, 1)`
- pastel red: `#EF6461` `rgba(239, 100, 97, 1)`
- platinum: `#E8E9EB` `rgba(232, 233, 235, 1)`
