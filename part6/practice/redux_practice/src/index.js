import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
	
	switch (action.type) {
		case 'INCREMENT':
			console.log(action.type);
			return state + 1;

		case 'DECREMENT':
			console.log(action.type);
			return state - 1;
			
		case 'ZERO':
			console.log(action.type);
			return 0;

		default: //if none of the above matches, code comes here
			return state
	}
}

const store = createStore(counterReducer)

const CustomButton = ({ buttonName, action }) => {
	
	const handler = () => {
		store.dispatch(action)
	}

	return(
		<>
			<button onClick={() => handler() }>
				{ buttonName }
			</button>
		</>
	)
}

const App = () => {

	return(
		<div>
			<h1>Title</h1>
			
			<div>
				{ store.getState() }
			</div>

			<CustomButton buttonName="plus" action={ {type: 'INCREMENT'} } />
			<CustomButton buttonName="minus" action={ {type: 'DECREMENT'} } />
			<CustomButton buttonName="zero" action={ {type: 'ZERO'} } />

		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(<App />)
}

renderApp()
store.subscribe(renderApp)