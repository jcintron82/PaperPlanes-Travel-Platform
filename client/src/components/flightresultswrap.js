import "../css/flightresults.css";
import { useState } from "react";
import { queryResponseObj } from "./utility/flightquerymodel";

export function FlightResultsWrap() {
  const [departureLocation, setDepartureLocation] = useState(queryResponseObj[0].message.data);
//   const [departureTime, setDepartureTime] = useState(queryResponseObj[0].message.data[0].itineraries[0].segments[0].departure.at.slice(11,19));
//   console.log(dapartTime.toLocaleTimeString('en-US'))
//   const responseArr = [];
const log = (data) => {
    setDepartureLocation(data);
    console.log(queryResponseObj)
}
const formatFlightTimeString = (string) => {
    const number = Number(string);
    console.log(number)
};

  return (
    <div className="App">
      <article className="flightResultsWrap">
        <h1>
          {departureLocation.map((item, index) => (
            <li
              // onClick={(e) => {
              //   setDeleteIndex(index);
              // }}
              // className={
              //   deleteIndex === index ? "highlightselectedproduct" : "priceli"
              // }
              key={index}
            >
              {" "}
              <article className="flightResultsTabs">
                  <div className="flightmaindetailswrap">
                    <h1 className="flightTimesWrap">{new Date (item.itineraries[0].segments[0].departure.at).toLocaleTimeString('en-US')} - {new Date (item.itineraries[0].segments[0].arrival.at).toLocaleTimeString('en-US')}
                     </h1>
                    <h2>{'('+item.itineraries[0].segments[0].departure.iataCode+')'} -  
                    {' ('+item.itineraries[0].segments[0].arrival.iataCode+')'} </h2>
                    <h3>Carrier: {item.itineraries[0].segments[0].carrierCode}</h3>
                  </div>
                  <div>Meta</div>
                  <div>
                    Price: {item.price.total} {item.price.currency}<br></br>
                    Seats left: {item.numberOfBookableSeats}<br></br>
                  </div>
              </article>
            </li>
          ))}
        </h1>
      </article>
      <button onClick={log}>Click Me</button>
    </div>
  );
}
export default FlightResultsWrap;
