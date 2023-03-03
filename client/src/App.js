import "./App.css";
import { useState } from 'react'


function App() {
  const [departureLocation, setDepartureLocation] = useState('X');
  const responseArr = [];

  const flightQuery = async () => {
    const pull = await fetch('http://localhost:8000/query');
    const data = await pull.json();
    console.log(pull)
    setDepartureLocation(data.message.data[0].itineraries[0].segments[0].departure.iataCode)
    responseArr.push(data.message.data)
    console.log(responseArr)
    responseArr.push()
  }



  // const receiveFlightData = async (accessToken) => {
  //   const flights = await fetch(
  //     "https://test.api.amadeus.com/v2/reference-data/urls/checkin-links?airline=IB",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  //   const data = await flights.json();

  //   console.log(flights);
  //   console.log(data);
  // };
  return (
    <div className="App">
      <article>
        <h1>Flights { departureLocation } </h1>
        <div>{responseArr[0].map((res) => {
          <div>{res.id}</div>
        })}</div>
      </article>
      <button onClick={flightQuery}>Click Me</button>
    </div>
  );
}

export default App;