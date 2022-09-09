import { useEffect, useState } from "react";
import axios from 'axios';

import SearchBar from "./components/SearchBar";
import Displayer from "./components/Displayer";


const App = () => {

	const [ filter, setfilter ] = useState('')
	const [ search, setSearch ] = useState('');
	const [ data, setData ]= useState([]);
	
	const filterHandler = (event) => {
			setfilter(event.target.value);
	}

	const submitHandler = (e) => {
		e.preventDefault();

		setSearch(filter);
	}

	const showCountry = (country, evt) => {

		setfilter(country)
		setSearch(country)
	}

	const dataFetch = () => {
		if(search !== ''){
			axios
				.get(`https://restcountries.com/v3.1/name/${search}`)
				.then(response => {
					setData(response.data);
				})
				.catch(error => { 
					console.log(error);
					setData([]);
				});
		}	
	}

	useEffect(dataFetch, [search]);

	return (
		<div>
			<SearchBar 
				value={filter}
				handler={filterHandler}
				submit={submitHandler}
			/>

			<Displayer data={data} show={showCountry} />
		</div>
	);
}

export default App;
