import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, extendReducer } from 'views/create-store'
import { AvatarAdjuster } from './avatar-adjuster'
import { reducer, boundActionCreators } from '../store'
import { loadPState } from '../p-state'
import { globalSubscribe, globalUnsubscribe } from '../observers'

const {$} = window

$('#fontawesome-css').setAttribute(
  'href',
  require.resolve('font-awesome/css/font-awesome.css')
)

extendReducer('poi-plugin-avatar-adjuster', reducer)
globalSubscribe()

const handleWindowUnload = () => {
  window.removeEventListener('unload', handleWindowUnload)
  globalUnsubscribe()
}

window.addEventListener('unload', handleWindowUnload)

setTimeout(() => {
  const pState = loadPState()
  if (pState === null) {
    boundActionCreators.ready()
  } else {
    const {ui, shipAvatar} = pState
    boundActionCreators.ready({ui, shipAvatar})
  }
})

ReactDOM.render(
  <Provider store={store}>
    <div
      style={{margin: "0 5px", minWidth: 300}}
      className="avatar-adjuster-main">
      <AvatarAdjuster />
    </div>
  </Provider>,
  $('#content-root'))
