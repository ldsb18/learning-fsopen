import { useState } from 'react';

import Form from "./components/Form";
import DisplayContacts from './components/DisplayContacts';
import Filter from './components/Filter'

const App = () => {
	
	const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber]  = useState('');
	const [ filter, setFilter ] = useState('');


	const addContact = (event) => {
		event.preventDefault();
		
		const nameObject = {
			name: newName,
			number: newNumber,
			id: persons[persons.length-1].id + 1,
		};

		if(JSON.stringify(persons).includes(`"name":"${newName}"`) ){
			window.alert(`${newName} is already added to phonebook`);
		}else{
			setPersons(persons.concat(nameObject));
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