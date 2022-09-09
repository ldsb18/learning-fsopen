const SearchBar = ({ value, handler, submit}) => {
	return(
		<form onSubmit={submit}>
			Find countries <input 
				value={value}
				onChange={handler}
			/>
            <button>Submit</button>
		</form>
	)
}

export default SearchBar