const Filter = ({ handleFliter, filter }) => {
	
	return(
		<div>
			filter shown with: <input 
				value={filter}
				onChange={handleFliter}
			/>
		</div>
	)
}


export default Filter