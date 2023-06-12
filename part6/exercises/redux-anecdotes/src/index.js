import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer' 


const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)