import { useState } from 'react';

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event = {target: {value: ''}}) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}