import Bridge from '@utils/bridge'
import { initDevTools } from '@front'
import { installHook } from '@back/hook'

/**
 * @param {HTMLDivElement} el - where to mount the devtools app
 * @param {HTMLElement} contextElement? - an element whose context contains the Vue App
 * @param {function} onReload? - the function called when the devtools bridge triggers a reload event
 */
export function inlineDevtools(devtoolsEl, appElement, onReload) {
  protectAgainstCors(appElement)

  const context = appElement.tagName.match(/iframe/i) ?
    getIframeContext(appElement, onReload) :
    getDefaultContext(devtoolsEl, onReload)

  const source = `;(${installHook.toString()})(window)`
  const targetWindow = context.targetWindow
  targetWindow.eval(source)

  initDevTools({
    el: devtoolsEl,
    connect (cb) {
      const script = context.contentDocument.createElement('script')
      script.textContent = require('!!raw-loader!../build/backend.js').default
      context.contentDocument.body.appendChild(script)

      cb(new Bridge({
        listen: fn => targetWindow.parent.addEventListener('message', evt => fn(evt.data)),
        send: data => targetWindow.postMessage(data, '*')
      }))
    },
    onReload: context.onReload
  })
}

const getDefaultContext = (element, onReload) => ({
  targetWindow: window,
  contentDocument: window.document,
  onReload: typeof onReload === 'function'? onReload: () => {}
})

const getIframeContext = (iframe, onReload) => ({
  targetWindow: iframe.contentWindow,
  contentDocument: iframe.contentDocument,
  onReload: typeof onReload === 'function' ? onReload: (cb) => iframe.onload = cb
})

const protectAgainstCors = (element) => {
  try {
    element.contentDocument
  } catch (err) {
    console.error('Cannot bind devtools to cross-domain application (iframes, etc must be in the same domain)')
    return
  }
}

window.VueDevtoolsInline = window.VueDevtoolsInline || {}
window.VueDevtoolsInline.inlineDevtools = inlineDevtools