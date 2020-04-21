export default function (name, bubbles = false, cancelable = true) {
  if (!process.browser) return

  if (window.Event) {
    return new Event(name, { bubbles, cancelable })
  }

  const event = document.createEvent('Event')
  event.initEvent(name, bubbles, cancelable)
  return event
}
