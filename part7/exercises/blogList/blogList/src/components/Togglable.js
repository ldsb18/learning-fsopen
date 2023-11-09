import { Button } from "@mui/material"
import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button variant="contained" color="primary" onClick={toggleVisibility}>cancel</Button>
			</div>
		</div>
	)
})

Togglable.displayName = "Togglable"

export default Togglable
