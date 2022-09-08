function Form({ addContact, handleNameChange, handleNumberChange, newName, newNumber }) {

	return (
		<div>
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
		</div>
	)
}

export default Form