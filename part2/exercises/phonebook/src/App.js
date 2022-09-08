import { useState } from 'react';

const Contact = ({ contact }) => {
		return(
			<p>{ contact.name }</p>
		)
}

const App = () => {
	
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]);

	const [newName, setNewName] = useState('');

	const addNote = (event) => {
		event.preventDefault();
		let flag = true;
		
		const nameObject = {
			name: newName,
		};

		/*First solution
		persons.map( (person) =>{
			if (person.name === newName) {
				window.alert(`${newName} is already added to phonebook`);
				flag = !flag;
			} 
		})

		if(flag){
			setPersons(persons.concat(nameObject));
		}*/

		//Second solution, this does not iterate the entire array for each added person
		if(JSON.stringify(persons).includes( JSON.stringify(nameObject) ) ){
			window.alert(`${newName} is already added to phonebook`);
		}else{
			setPersons(persons.concat(nameObject));
		}

		setNewName('')
	}

	const handleChange = (event) => {
		setNewName(event.target.value);
	}

	return (
		<div>

			<h2>Phonebook</h2>

			<form onSubmit={addNote}>

				<div>
					name: <input 
						value={ newName }
						onChange={handleChange}
					/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>

			</form>

			<h2>Numbers</h2>

			{persons.map( (person) => 
				<Contact key={person.name} contact={person} />
			)}

		</div>
	)
}

export default App