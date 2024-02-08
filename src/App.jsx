import { useState, useEffect } from 'react'
import './App.css'

/*Images */
import clearImg from './assets/clear-day copy.svg'
import humidityImg from './assets/humidity copy.svg'
import searchImg from './assets/loupe.png'
import drizzleImg from './assets/drizzle.svg'
import rainImg from './assets/rain.svg'
import snowImg from './assets/snow.svg'
import windImg from './assets/wind.svg'
import cloudDay from './assets/cloudy-day.svg'
import clearNight from './assets/clear-night.svg'
import cloudyNight from './assets/cloudy-night.svg'
import cloudyImgs from './assets/cloudy.svg'
import overcastImgs from './assets/overcast.svg'
import nightDrizzle from './assets/night-drizzle.svg'
import dayThunder from './assets/thunderstorms-day.svg'
import nightThunder from './assets/thunderstorms-night.svg'
import mistImg from './assets/mist.svg'
import pressureImg from './assets/barometer copy.svg'
import visibilityImg from './assets/visibility.png'



const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind, pressure, visibility}) => {

  return(
    <>
    <div className="image">
    <img src={icon} alt="image" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className='lat'> Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'> Longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="para">
      <p>Weather Today In {city}, {country}</p>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityImg} className='icon' alt="humidity" />
        <div className="data">
          <div className="humidity-percentage">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windImg} className='icon' alt="wind" />
        <div className="data">
          <div className="wind-percentage">{wind} Km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={pressureImg} className='icon' alt="pressure" />
        <div className="data">
          <div className="humidity-percentage">{pressure} mb</div>
          <div className="text">Pressure</div>
        </div>
      </div>
      <div className="element">
        <img src={visibilityImg} className='icon visi-img' alt="visibility" />
        <div className="data">
          <div className="wind-percentage"> {visibility} Km</div>
          <div className="text">Visibility</div>
        </div>
      </div>
    </div>
    
    </>
  )
};
WeatherDetails.proptypes

function App() {
  let api_key = "5ea5ca3aacfa2790c4197d25676f4a49";
  const [text, setText] = useState("Thanjavur");
  const [icon, setIcon] = useState(snowImg);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [visibility, setVisibility] = useState(0);
  

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap ={
    "01d": clearImg,
    "01n": clearNight,
    "02d": cloudDay,
    "02n": cloudyNight,
    "03d": cloudyImgs,
    "03n": cloudyImgs,
    "04d": overcastImgs,
    "04n": overcastImgs,
    "09d": rainImg,
    "09n": rainImg,
    "10d": drizzleImg,
    "10n": nightDrizzle,
    "11d": dayThunder,
    "11n": nightThunder,
    "13d": snowImg,
    "13n": snowImg,
    "50d": mistImg,
    "50n": mistImg,
  }

  const search = async() => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try{
    let res = await fetch(url);
    let data = await res.json();
    if(data.cod === "404"){
      console.error("City Not Found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    setPressure(data.main.pressure);
    setVisibility(data.visibility/1000);

    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode]);
    setCityNotFound(false);


  }catch (error){
    console.error ("An error occurred:", error.message);
    setError("An Error Occured While fetching Weather Data.")
  }finally{
    setLoading(false);
  }
};
  

  const handleCity = (e) =>{
    setText(e.target.value);
  };
  const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
      search();
    }
  };

  useEffect(function(){
    search();
  },[]);


  return (
    <>
    
      <div className='container'>
        <div className="input-container">
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity}
          value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=>search()}><img src={searchImg} className='search-img' alt="" /></div>
        </div>
       
        { loading && <div className="loading-message">Loading...</div>}
        { error && <div className="error-message">{error}</div>}
        { cityNotFound && <div className="city-not-found">City Not Found</div>}

        { !loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} 
        humidity={humidity} wind={wind} pressure={pressure} visibility={visibility}/>}

      </div>
			<div className='footer'>
        Developed by <a href="https://github.com/dhaneshkandan">J.Dhanesh Kandan.</a></div>
    </>
  )
}

export default App
