import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {

	const filterSelected = (value) => {
		console.log(value);
	}

	return(
		<div>
			<h1>PRACTICE</h1>

			<NewNote />
			<VisibilityFilter />
			<Notes />

		</div>
	)
}

export default App