import { useState, useEffect } from 'react';

import Form from "./components/Form";
import DisplayContacts from './components/DisplayContacts';
import Filter from './components/Filter'

import contactService from './services/contacts'

const App = () => {

	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber]  = useState('');
	const [ filter, setFilter ] = useState('');

	useEffect(() => {
		contactService
			.getAll()
			.then(initalContacts => {
				setPersons(initalContacts);
			})
	}, []);

	const addContact = (event) => {
		event.preventDefault();
		
		const nameObject = {
			name: newName,
			number: newNumber,
		};

		if(JSON.stringify(persons).includes(`"name":"${newName}"`) ){

			const id = persons.find(p => p.name === newName).id

			if(window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)){
				contactService
					.update(id, nameObject)
					.then( updatedContact => {
						setPersons(persons.map(p => p.id !== id ? p : updatedContact))
					})
			};
		}else{
			contactService
				.create(nameObject)
				.then(createdContact => {
					setPersons(persons.concat(createdContact));
				})
		}

		setNewName('');
		setNewNumber('');
	}

	const eraseContact = (id) => {
		const person = persons.find(p => p.id === id ).name;

		if(window.confirm(`Delete ${person}`)){
			contactService
			.deleteContact(id)
			.then(() => setPersons(persons.filter(p => p.id !== id)))
		}
	}

	//change handlers
	const handlers = {
		handleNameChange: (event) => {
			setNewName(event.target.value);
		},

		handleNumberChange: (event) => {
			setNewNumber(event.target.value);
		},

		handleFilterChange: (event) => {
			setFilter(event.target.value);
		},
	}

	const filteredContacts = ({ persons, filter }) => {

		return persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ));

	}

	return (
		<div>

			<h1>Phonebook</h1>

			<Filter 
				handleFliter={handlers.handleFilterChange}
				filter={filter}
			/>

			<h2>Add a new contact</h2>

			<Form 
				addContact={addContact}
				handleNameChange={handlers.handleNameChange}
				handleNumberChange={handlers.handleNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>

			<h2>Numbers</h2>

			<DisplayContacts 
				contacts={ filteredContacts({ persons, filter })}
				eraseContact={eraseContact} 
			/>

		</div>
	)
}

export default App