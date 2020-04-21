/**
 * Append scripts from admin panel
 * @param {Object} scripts
 * @param {string} scripts.head.end
 * @param {string} scripts.body.begin
 * @param {string} scripts.body.end
 */
export default function (scripts) {
  const range = document.createRange()

  // append to head
  if (scripts.hasOwnProperty('head')) {
    const head = document.getElementsByTagName('head')[0]

    try {
      range.setStart(head)
    } catch (err) {
      range.setStart(head, 0) // - didn't work for moderately old iOS
    }

    if (scripts.head.end) {
      head.appendChild(
        range.createContextualFragment(scripts.head.end)
      )
    }
    if (scripts.head.begin) {
      head.insertBefore(
        range.createContextualFragment(scripts.head.begin), head.firstChild
      )
    }
  }

  // append to body
  range.selectNode(document.body)
  if (scripts.hasOwnProperty('body')) {
    const body = document.body
    if (scripts.body.begin) {
      body.insertBefore(
        range.createContextualFragment(scripts.body.begin), body.firstChild
      )
    }
    if (scripts.body.end) {
      body.appendChild(
        range.createContextualFragment(scripts.body.end)
      )
    }
  }
}
