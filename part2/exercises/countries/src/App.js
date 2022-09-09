import { useEffect, useState } from "react";
import axios from 'axios';

import SearchBar from "./components/SearchBar";
import Displayer from "./components/Displayer";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {

	const [ filter, setfilter ] = useState('')
	const [ search, setSearch ] = useState('');
	const [ data, setData ]= useState([]);
	const [ weather, setWeather ] = useState({
		name: '',
		temperature: 0,
		wind: 0,
		imgurl: '',
	})
	
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

	const weatherFetch = (data) => {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.name.common}&units=metric&appid=${api_key}`)
			.then(response => {
				setWeather({
					name: data.name.common,
					temperature: response.data.main.temp,
					wind: response.data.wind.speed,
					imgurl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
				})
			})
			.catch((error) => {
				console.log('there was an error', error)
			})
	}

	const dataFetch = () => {

		if(search.length !== 0){
			axios
				.get(`https://restcountries.com/v3.1/name/${search}`)
				.then(response => {
					setData(response.data);

					if(response.data.length === 1){
						weatherFetch(response.data[0])						
					}
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

			<Displayer data={data} show={showCountry} weather={weather} />
		</div>
	);
}

export default App;
