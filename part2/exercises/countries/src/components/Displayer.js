const Countries = ({ data, show }) => {

	return(
		<div>
			{data.map( (country) => {
				return(
					<div key={country.cca3}>	
						<p >{ country.name.common }</p>
						<button onClick={(evt) => {show(country.name.common, evt)}} >Show</button>
					</div>
				)
			})}
		</div>
	)
}

const Country = ({ data }) => {

	const countryObject = {
		name: data.name.common,
		capital: data.capital,
		area: data.area,
		languages: data.languages,
		flag: data.flag 
	}

	const langKeys = Object.keys(countryObject.languages);

	return(
		<div>
			<h1>{ countryObject.name }</h1>

			<h3>Capital: { countryObject.capital }</h3>
			<p>Area: { countryObject.area } m2</p>

			<h2>Languages:</h2>
			<ul>
				{langKeys.map( (key) => {
					return(
						<li key={key}>{ countryObject.languages[key] }</li>
					)
				})}
			</ul>

			<div style={{fontSize: 200}}>{ countryObject.flag }</div>
		</div>
	)
}

const Weather = ({ data }) => {

	return(
		<div>
			<h2>{`Weather in ${data.name}`}</h2>

			<img src={ data.imgurl } />
			<p>Temperature: { data.temperature } ºC</p>
			<p>Wind: { data.wind } m/s</p>
		</div>
	)
}

const Displayer = ({ data, show, weather }) => {

	if(data.length > 10){
		return(
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	} else if (data.length === 0){
		return(
			<div>
				<p>No matches</p>
			</div>
		)
	} else if(data.length > 1 && data.length <= 10) {
		return(
			<Countries data={data} show={show} />
		)
	} else if (data.length === 1) {
		
		return(
			<div>
				<Country data={data[0]} />
				<Weather data={weather}  />
			</div>
		)
	}
}

export default Displayer