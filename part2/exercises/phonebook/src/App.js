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
			window.alert(`${newName} is already added to phonebook`);
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

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	}

	const filteredContacts = ({ persons, filter }) => {

		return persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ));

	}

	return (
		<div>

			<h1>Phonebook</h1>

			<Filter 
				handleFliter={handleFilterChange}
				filter={filter}
			/>

			<h2>Add a new contact</h2>

			<Form 
				addContact={addContact}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>

			<h2>Numbers</h2>

			<DisplayContacts 
				contacts={ filteredContacts({ persons, filter })} 
			/>

		</div>
	)
}

export default App