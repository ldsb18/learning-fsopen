import { useState } from 'react';

const Contact = ({ contact }) => {
		return(
			<tr>
				<td>{ contact.name }</td>
				<td>{ contact.number }</td>
			</tr>
		)
}

const DisplayContacts = ({ contacts }) => {

	return(
		<table>
			<tbody>
				{contacts.map( (person) => 
					<Contact key={person.id} contact={person} />
				)}
			</tbody>
		</table>
	)
}

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

	const handlefilterChange = (event) => {
		setFilter(event.target.value);
	}

	const filteredContacts = ({ persons, filter }) => {

		return persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ));

	}

	return (
		<div>

			<h1>Phonebook</h1>

		 	<div>
				filter shown with: <input 
					value={filter}
					onChange={handlefilterChange}
				/>
			</div>

			<h2>Add a new contact</h2>

			<form onSubmit={addContact}>

				<div>
					name: <input 
						value={ newName }
						onChange={handleNameChange}
					/>
				</div>

				<br />

				<div>
					number: <input 
						value={ newNumber }
						onChange={handleNumberChange}
					/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>

			</form>

			<h2>Numbers</h2>

			<DisplayContacts contacts={ filteredContacts({ persons, filter }) } />

		</div>
	)
}

export default App