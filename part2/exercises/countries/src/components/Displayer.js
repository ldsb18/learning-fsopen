
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
			<p>Area: { countryObject.area }</p>

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

const Displayer = ({ data, show }) => {

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
			<Country data={data[0]}/>
		)
	}
}

export default Displayer