import { useState } from 'react';

const Contact = ({ contact }) => {
		return(
			<tr>
				<td>{ contact.name }</td>
				<td>{ contact.number }</td>
			</tr>
		)
}

const App = () => {
	
	const [persons, setPersons] = useState([{ 
			name: 'Arto Hellas',
			number: '040-1234567'
	}]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const addContact = (event) => {
		event.preventDefault();
		
		const nameObject = {
			name: newName,
			number: newNumber
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

	return (
		<div>

			<h2>Phonebook</h2>

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

			<table>
				<tbody>
					{persons.map( (person) => 
						<Contact key={person.name} contact={person} />
					)}
				</tbody>
			</table>		

		</div>
	)
}

export default App