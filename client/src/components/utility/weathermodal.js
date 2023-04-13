import { useState, useEffect } from 'react'

export const WeatherModal = () => {
    const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const possibleWeathers = ['Honolulu', 'Malaga', 'San Diego']



const fetchWeather = async () => {
    const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHERKEY}`);
    const data = await getWeather.json();
    const getComparisonWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${possibleWeathers[0]}&appid=${process.env.REACT_APP_WEATHERKEY}`);
    console.log(await getComparisonWeather.json())
    console.log(data);
  }


  const fetchIP = async () => {
    const getIP = await fetch(`http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPKEY}`);
    const data = await getIP.json();
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    console.log(data);
    fetchWeather();
  }
  useEffect(() => {
    fetchIP();
    console.log(latitude, longitude)
  }, [latitude, longitude])
return (
    <section>
        WEATHER
    </section>
)
}

export default WeatherModal;