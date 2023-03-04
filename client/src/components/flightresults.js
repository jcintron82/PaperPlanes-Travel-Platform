import "./css/flightresults.css";
import { useState } from "react";

export function FlightResultTabs() {
//   const [departureLocation, setDepartureLocation] = useState([]);
//   const [queryRecieved, setQueryStatus] = useState(false);
//   const responseArr = [];

//   const flightQuery = async () => {
//     const pull = await fetch("http://localhost:8000/query");
//     const data = await pull.json();
//     console.log(pull);
//     setDepartureLocation(data.message.data);
//     setQueryStatus(!queryRecieved);
//     responseArr.push(data.message.data);
//     console.log(departureLocation);
//     setQueryStatus(!queryRecieved);
//     {
//       console.log(departureLocation);
//     }
//   };
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
                    Dep: {item.itineraries[0].segments[0].departure.iataCode} 
                    {item.itineraries[0].segments[0].departure.at + '333'}
                    Arrs: {item.itineraries[0].segments[0].arrival.iataCode} 
                    {item.itineraries[0].segments[0].arrival.at}
                    {item.itineraries[0].segments[0].arrival.terminal}<br></br>
                    Carrier: {item.itineraries[0].segments[0].carrierCode}
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
      <button onClick={flightQuery}>Click Me</button>
    </div>
  );
}
export default App;
