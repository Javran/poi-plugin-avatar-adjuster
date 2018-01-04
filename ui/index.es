import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'views/create-store'
import { Placeholder } from 'subtender/poi'

const {$} = window

$('#fontawesome-css').setAttribute(
  'href',
  require.resolve('font-awesome/css/font-awesome.css')
)

ReactDOM.render(
  <Provider store={store}>
    <div
      style={{margin: "0 5px", minWidth: 300}}
      className="avatar-adjuster-main">
      <Placeholder />
    </div>
  </Provider>,
  $('#content-root'))
