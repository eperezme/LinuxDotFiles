//
// Listens for webview events
//

;(function() {
  const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  chrome.runtime.onMessage.addListener(action => {
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    switch (action.type) {
      case 'navigate':
        history.go(Number(action.payload) || 0)
        break
      case 'reload':
        location.reload(Boolean(action.payload))
        break
      case 'stop':
        stop()
        break
    }
  })

  chrome.runtime.sendMessage({
    type: 'metastream-webview-event',
    payload: { type: 'load-script' }
  })

  // Forward activity signal to top frame
  // Used for determining inactivity in interactive mode and for verifying
  // whether user triggered media state changes.
  const onWebviewActivity = event => {
    if (!event.isTrusted) return
    chrome.runtime.sendMessage({
      type: 'metastream-webview-event',
      payload: { type: 'activity', payload: event.type }
    })
  }
  const onFrequentWebviewActivity = throttle(onWebviewActivity, 500)
  const onImportantWebviewActivity = throttle(onWebviewActivity, 80)
  document.addEventListener('mousemove', onFrequentWebviewActivity, true)
  document.addEventListener('mousedown', onImportantWebviewActivity, true)
  document.addEventListener('mouseup', onImportantWebviewActivity, true)
  document.addEventListener('mousewheel', onFrequentWebviewActivity, true)
  document.addEventListener('keydown', onImportantWebviewActivity, true)

  const mainWorldScript = function() {
    document.getElementById('metastreamwebviewinit').remove()

    //===========================================================================
    // Sandboxed IFrame detection workaround
    //===========================================================================

    try {
      Object.defineProperty(document, 'domain', {
        value: document.domain,
        writable: true
      })
    } catch (e) {}

    Object.defineProperty(HTMLObjectElement.prototype, 'onerror', {
      set: () => {}
    })

    //===========================================================================
    // Third-party blocking workarounds
    //===========================================================================

    // Chrome disables access to storage in third-party browser contexts.
    // Provide basic polyfills to prevent access errors.
    try {
      window.localStorage
    } catch (e) {
      if (e instanceof DOMException) {
        class MemoryStorage {
          storage = {}
          get length() { return Object.keys(this.storage).length }
          getItem(key) { return this.storage[key] }
          setItem(key, value) { this.storage[key] = value }
          removeItem(key) { delete this.storage[key] }
          clear() { this.storage = {} }
          key(i) { return Object.keys(this.storage)[i] }
        }
        Object.defineProperty(window, 'localStorage', { value: new MemoryStorage() })
        Object.defineProperty(window, 'sessionStorage', { value: new MemoryStorage() })
      }
    }
  }

  const script = document.createElement('script')
  script.id = 'metastreamwebviewinit'
  script.textContent = `(${mainWorldScript}());`
  if (document.documentElement) {
    document.documentElement.appendChild(script)
  }
})()
