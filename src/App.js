import React, {useState} from 'react';
import axios from 'axios';
import sun from './assets/sun.png';
import moon from './assets/moon.png';
import wind from './assets/wind-rose.png';
import celcius from './assets/celcius.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import moment from 'moment';
import LanguageIcon from '@mui/icons-material/Language';

import './App.css';

function App() {
  const [locWeather, setLocWeather] = useState();
  const [location, setLocation] = useState();

  const showWeather = () => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=fde839bd8e7840068df113219240609&q=${location}&days=7`)
      .then((response) => {
        setLocWeather(response.data);
      })
      setLocation("");
    }
  return (
    
    <div className="App">
      <div className='upPart'>
      <div className='titles'>
      <h1 className='title'>Weather app</h1>
      <h3 className='intro'>Type any location to get its data</h3>
      </div>
      <div className='searchBar'>
        <input
        value={location}
        onChange={(e) => setLocation(e.target.value)} />
        <button onClick={() => showWeather()}>&#9730;</button>
      </div>
    </div>

    <div className='weatherBody'>
      <div className='locationWeather'>
      <div className='locationInfo'>
        <h2 className='locName'><LocationOnIcon className='ico'/><span>{locWeather?.location.name}</span>  </h2>
        <h2 className='locRegion'><LocationCityIcon className='ico'/><span>{locWeather?.location.region}</span>  </h2>
        <h2 className='locCountry'><PublicIcon className='ico'/><span>{locWeather?.location.country}</span>  </h2>
        <h2 className='loc.lat'><LanguageIcon className='ico'/><span>Lat: {locWeather?.location.lat}</span>  </h2>
        <h2 className='loc.lon'><LanguageIcon className='ico'/><span>Lon: {locWeather?.location.lon}</span> </h2>
      </div>

      <div className='currentWeather'>
      <h3 className='clock'>{moment(locWeather?.location.localtime).calendar()} </h3>
        <div className='iconInfo'>
        <div className='iconText'>
        <img src={locWeather?.current.condition.icon} className='currIcon'/>
        <h3 className='text'>{locWeather?.current.condition.text}</h3>
        </div>
        
        <div className='tempWind'>
        <h3 className='tempC'>Temp: {locWeather?.current.temp_c} <img className='celciusImg' src={celcius} style={{width: '40px', height:"40px"}}/></h3>
        <h3 className='feelC'>Feels: {locWeather?.current.feelslike_c} <img className='celciusImg' src={celcius} style={{width: '40px', height:"40px"}}/></h3>
        <h4 className='Wind'>Wind: {locWeather?.current.wind_kph} {locWeather?.current.wind_dir} <img className='wind' src={wind} style={{width: '40px', height:"40px"}} /></h4>
        </div>
        </div>
      </div>
      </div>

      <div className='forecastdiv'>
        {locWeather?.forecast.forecastday?.map((val, key) => {
          return (
            <div className='forecast' key={key}>
              <h3>{moment(val?.date).format('dddd')}</h3>
              <h3><img src={val?.day.condition.icon}/></h3>
              <h3 className='cIcon'>&#8593; {val?.day.maxtemp_c} <img className='cIco' src={celcius} style={{height: '30px', width: '30px'}}/></h3>
              <h3 className='cIcon'>&#8595; {val?.day.mintemp_c} <img className='cIco' src={celcius} style={{height: '30px', width: '30px'}}/></h3>
            </div>
          )
        })}
      </div>
      

      </div>
      
  </div>
  );
}


export default App;
