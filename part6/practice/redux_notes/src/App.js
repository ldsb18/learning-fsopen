import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {

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