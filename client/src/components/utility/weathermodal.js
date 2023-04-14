import { useState, useEffect } from "react";
import "../../css/utility/weathermodal.css";
export const WeatherModal = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [usersTemp, setUsersTemp] = useState(null);
  const [usersLocation, setUsersLocation] = useState(null);
  const [comparisonLocation, setCOmparisonLocation] = useState(null);
  const [comparisonTemp, setComparisonTemp] = useState(null);
  const possibleWeathers = ["Honolulu", "Malaga", "San Diego"];

  const fetchWeather = async () => {
    const getWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHERKEY}`
    );
    const data = await getWeather.json();
    const getComparisonWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${possibleWeathers[0]}&appid=${process.env.REACT_APP_WEATHERKEY}`
    );
    const comparison = await getComparisonWeather.json();
    console.log(comparison);
    console.log(data)
    setComparisonTemp( ((comparison.main.temp - 273.15) * (9 / 5) + 32).toFixed(2)
    );
    setCOmparisonLocation(comparison.name)
    setUsersTemp(((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2));
  };

  const fetchIP = async () => {
    const getIP = await fetch(
      `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPKEY}`
    );
    const data = await getIP.json();
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setUsersLocation(data.city +", " + data.region_code)
    fetchWeather();
  };
  useEffect( () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, [latitude, longitude]);
  return (
    <article className="mainweatherwrap">
      <section>
        <h1>What It Is..</h1>{usersLocation} {usersTemp}{" "}
      </section>
      <section>
      <h1> What It Could Be..</h1>{comparisonLocation}{comparisonTemp}{" "}
      </section>
    </article>
  );
};

export default WeatherModal;
