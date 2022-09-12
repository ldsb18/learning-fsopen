import { useState, useEffect } from 'react';

import Form from "./components/Form";
import DisplayContacts from './components/DisplayContacts';
import Filter from './components/Filter'
import Notification from './components/Notification';

import contactService from './services/contacts'


const notificationGlobalTime = 3000;

const App = () => {

	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber]  = useState('');
	const [ filter, setFilter ] = useState('');
	const [ notificationMessage, setNotificationMessage] = useState(null);
	const [ notificationType, setNotificationType] = useState(null);

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
					.then( updatedContact => setPersons(persons.map(p => p.id !== id ? p : updatedContact)))
					.then( () => {
						setNotificationMessage(
							`${newName} has been updated`
						)
						setNotificationType('success')
						setTimeout(() => {
							setNotificationMessage(null)
							setNotificationType(null)
						}, notificationGlobalTime);
					})
					.catch( error => {
						console.log(error);
						setNotificationMessage(
							`An error ocurred trying to update ${newName}'s information`
						)
						setNotificationType('error')
						setTimeout(() => {
							setNotificationMessage(null)
							setNotificationType(null)
						}, notificationGlobalTime);
					})
			};
		}else{
			contactService
				.create(nameObject)
				.then(createdContact => setPersons(persons.concat(createdContact)) )
				.then( () => {
					setNotificationMessage(
						`${newName} has been added to phonebook`
					)
					setNotificationType('success')
					setTimeout(() => {
						setNotificationMessage(null)
						setNotificationType(null)
					}, notificationGlobalTime);
				})
				.catch( error => {
					console.log(error);
					setNotificationMessage(
						`An error ocurred trying to add ${newName}'s information`
					)
					setNotificationType('error')
					setTimeout(() => {
						setNotificationMessage(null)
						setNotificationType(null)
					}, notificationGlobalTime);
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
			.then( () => {
				setNotificationMessage(
					`${person} has been deleted`
				)
				setNotificationType('success')
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationType(null)
				}, notificationGlobalTime);
			})
			.catch( error => {
				console.log(error);

				setPersons(persons.filter(p => p.id !== id))
				setNotificationMessage(
					`Information of ${person} has already been removed from the server`
				)
				setNotificationType('error')
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationType(null)
				}, notificationGlobalTime);
			})
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

			<Notification message={notificationMessage} type={notificationType} />

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