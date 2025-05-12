import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
     let[city, setCity] = useState("");
    const API_URL ="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "2955a8649ffe4d40d5db8a04e1125e92";

    let getWeatherInfo = async( ) => {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();
      console.log(jsonResponse);

      let result = {
        city: city,
         temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_Like,
        weather: jsonResponse.weather[0].description,
      }
     
      return result;
    }

    let handleChange = (event) => {
        setCity(event.target.value);
    }
    
    let handleSubmit = async (event) => {
        event.preventDefault ();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
       updateInfo(newInfo);
    }

        return(
        <div className='search'>
         <h2> Search for the weather </h2>
         <form  onSubmit={handleSubmit}>
          <TextField id="city" 
          label="City Name "
          variant="outlined" 
         required
        value={city}
        onChange={handleChange} />
          &nbsp; &nbsp;
            <Button variant="contained" type="submit"> Search </Button>
            </form>
        </div>
    );
}
