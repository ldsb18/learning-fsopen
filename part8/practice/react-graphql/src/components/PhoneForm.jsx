import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"

import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

	useEffect(() => {
		if(result.data && result.data.editNumber === null) {
			setError('person not found')
		}
	}, [result.data])

	const submit = (evt) => {
		evt.preventDefault()

		changeNumber({
			variables: {name, phone},
			onError: (error) => {
				const message = error.graphQLErrors.map(e => e.message).join('\n')
				setError(message)
			}
		})

		setName('')
		setPhone('')
	}

	return(
		<div>
			<h2>Change number</h2>
			<form onSubmit={submit}>
				<div>
					name: <input 
						value={name}
						onChange={ ({ target }) => setName(target.value) }
					/>
				</div>
				<div>
					phone: <input 
						value={phone}
						onChange={ ({ target }) => setPhone(target.value) }
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}

export default PhoneForm