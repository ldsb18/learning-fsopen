import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux'
import { Provider  } from 'react-redux';

import App from './App';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer)

//testing reducer actions
{
	store.dispatch({
		type: 'NEW_NOTE',
		payload: {
			content: 'the app state is in redux store',
			important: true,
			id: 1
		}
	})

	store.dispatch({
		type: 'NEW_NOTE',
		payload: {
			content: 'state changes are made with actions',
			important: false,
			id: 2
		}
	})

	store.dispatch({
		type: 'TOGGLE_IMPORTANCE',
		payload: {
			important: false,
			id: 2
		}
	})
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App /> 
    </Provider>
);