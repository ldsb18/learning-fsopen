import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
	const [ visible, setVisible ] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toogleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toogleVisibility
		}
	})

	return(
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toogleVisibility} >{ props.buttonLabel }</button>
			</div>

			<div style={showWhenVisible} className='togglableContent'>
				{ props.children }
				<button onClick={toogleVisibility} >Cancel</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Toggable'

export default Togglable