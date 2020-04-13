import React from 'react'

const Datawindow = ({countrydata}) => {

    const text = () =>{

       if(countrydata.length > 10) return('Too many matches')
       else if(countrydata.length < 10 && countrydata.length > 1) return(countrydata.map(country => <li key = {country.name}>{country.name}</li>))
       else if(countrydata.length === 1){

        const country = countrydata[0]
        console.log(country)

        return(
            <>
            <h1>{country.name}</h1>

            <div>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                  
            </div>
            <div>
                <h2>Languages</h2>
                <ul>{country.languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
            </div>
            <div>
                <img src = {country.flag} alt = "The flag" style ={{width:350, height:200 }} resizemode = "contain"/>
            </div>
            </>
        ) 

       }
    }
    console.log(countrydata)
    return(
    <ul>{text()}</ul>
    )
}

export default Datawindow;