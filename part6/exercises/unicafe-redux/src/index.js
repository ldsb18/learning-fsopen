import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducers/reducer'

const store = createStore(reducer)

const CustomButton = ({ label, action }) => 
  <button onClick={ () => store.dispatch(action) }>
    { label }
  </button>

const App = () => {

  return (
    <div>

      <CustomButton   label="good"        action={ {type: 'GOOD'} }/>
      <CustomButton   label="ok"          action={ {type: 'OK'} }/>
      <CustomButton   label="bad"         action={ {type: 'BAD'} }/>
      <CustomButton   label="reset stats" action={ {type: 'ZERO'} }/>

      <div>good - {store.getState().good}</div>
      <div>ok - {store.getState().ok}</div>
      <div>bad - {store.getState().bad}</div>

    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
