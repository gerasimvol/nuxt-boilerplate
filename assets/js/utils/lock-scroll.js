// If you want to fix windows scrollbar jump –
// add { reserveScrollBarGap: true } as second param to disableBodyScroll
//
// disableBodyScroll(el, {
//   reserveScrollBarGap: true
// })

let hasPassiveEvents = false
if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive () {
      hasPassiveEvents = true
      return undefined
    }
  }
  window.addEventListener('testPassive', null, passiveTestOptions)
  window.removeEventListener('testPassive', null, passiveTestOptions)
}

const isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform)

let locks = []
let documentListenerAdded = false
let initialClientY = -1
let previousBodyOverflowSetting
let previousBodyPaddingRight

const allowTouchMove = el => locks.some(lock => {
  if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
    return true
  }

  return false
})

const preventDefault = rawEvent => {
  const e = rawEvent || window.event

  if (allowTouchMove(e.target)) {
    return true
  }

  if (e.touches.length > 1) return true

  if (e.preventDefault) e.preventDefault()

  return false
}

const setOverflowHidden = options => {
  setTimeout(() => {
    if (previousBodyPaddingRight === undefined) {
      const reserveScrollBarGap = !!options && options.reserveScrollBarGap === true
      const scrollBarGap = window.innerWidth - document.documentElement.clientWidth

      if (reserveScrollBarGap && scrollBarGap > 0) {
        previousBodyPaddingRight = document.body.style.paddingRight
        document.body.style.paddingRight = `${scrollBarGap}px`

        // FIX HEADER SCROLL BAR JUMP (ADD PADDING)
        document.querySelector('header').style.paddingRight = scrollBarGap + 'px'
      }
    }

    if (previousBodyOverflowSetting === undefined) {
      previousBodyOverflowSetting = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  })
}

const restoreOverflowSetting = () => {
  setTimeout(() => {
    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight

      // FIX HEADER SCROLL BAR JUMP (REMOVE PADDING)
      document.querySelector('header').style.paddingRight = previousBodyPaddingRight

      previousBodyPaddingRight = undefined
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting

      previousBodyOverflowSetting = undefined
    }
  })
}

const isTargetElementTotallyScrolled = targetElement => targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false

const handleScroll = (event, targetElement) => {
  const clientY = event.targetTouches[0].clientY - initialClientY

  if (allowTouchMove(event.target)) {
    return false
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    return preventDefault(event)
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    return preventDefault(event)
  }

  event.stopPropagation()
  return true
}

export const disableBodyScroll = (targetElement, options) => {
  if (isIosDevice) {
    if (!targetElement) {
      console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.')
      return
    }

    if (targetElement && !locks.some(lock => lock.targetElement === targetElement)) {
      const lock = {
        targetElement,
        options: options || {}
      }

      locks = [...locks, lock]

      targetElement.ontouchstart = event => {
        if (event.targetTouches.length === 1) {
          initialClientY = event.targetTouches[0].clientY
        }
      }
      targetElement.ontouchmove = event => {
        if (event.targetTouches.length === 1) {
          handleScroll(event, targetElement)
        }
      }

      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)
        documentListenerAdded = true
      }
    }
  } else {
    setOverflowHidden(options)
    const lock = {
      targetElement,
      options: options || {}
    }

    locks = [...locks, lock]
  }
}

export const clearAllBodyScrollLocks = () => {
  if (isIosDevice) {
    locks.forEach(lock => {
      lock.targetElement.ontouchstart = null
      lock.targetElement.ontouchmove = null
    })

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)
      documentListenerAdded = false
    }

    locks = []

    initialClientY = -1
  } else {
    restoreOverflowSetting()
    locks = []
  }
}

export const enableBodyScroll = targetElement => {
  if (isIosDevice) {
    if (!targetElement) {
      console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.')
      return
    }

    targetElement.ontouchstart = null
    targetElement.ontouchmove = null

    locks = locks.filter(lock => lock.targetElement !== targetElement)

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)

      documentListenerAdded = false
    }
  } else if (locks.length === 1 && locks[0].targetElement === targetElement) {
    restoreOverflowSetting()

    locks = []
  } else {
    locks = locks.filter(lock => lock.targetElement !== targetElement)
  }
}
