import { useState, forwardRef, useImperativeHandle } from "react"

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

            <div style={showWhenVisible}>
                { props.children }
                <button onClick={toogleVisibility} >Cancel</button>
            </div>
        </div>
    )
})

export default Togglable