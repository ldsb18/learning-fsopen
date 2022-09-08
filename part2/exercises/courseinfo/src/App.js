const Header = ({ course }) => {
	return(
		<h1>{course}</h1>
	)
}

const Total = ({ sum }) => {
	return(
		<p>Number of exercises {sum}</p>
	)
}

const Part = ({ part }) => {
	return(  
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({ parts }) => {
	
	let keyNumber = 0;
	
	return(
		<div>
			{ parts.map( (part) =>
				<Part	key={keyNumber++} part={part} />
			)}   
		</div>
	)
}

const Course = ({ course }) => {
	return(
		<div>
			<Header course={course.name} />

			<Content parts={course.parts} />

			<Total sum={course.parts.reduce( (sum, part) => sum + part.exercises, 0)} />
		</div>
	)
}

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			},
			{
				name: 'Redux',
				exercises: 11
			}
		]
	}

	return <Course course={course} />
}

export default App