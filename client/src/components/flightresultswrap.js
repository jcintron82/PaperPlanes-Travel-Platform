import "../css/flightresults.css";
import { useState } from "react";
import { queryResponseObj } from "./utility/flightquerymodel";
// var Amadeus = require('amadeus');
//     var amadeus = new Amadeus({
//       clientId: 'GRtJGMGPhca4HB7pGdxl8QSEDCdmAMYg',
//       clientSecret: '3MnGKcngxpSx3KIv'
//     });
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
//This block is necessary for converting the carrier codes into full names
//The other option is use the carrier code API but this was the best solution
for (let i = 0; i < departureLocation.length; i++){
    for (const [key, value] of Object.entries(queryResponseObj[0].carriers)) {
        if(departureLocation[i].itineraries[0].segments[0].carrierCode === key)
        departureLocation[i].itineraries[0].segments[0].carrierCode = value;     
      }
}


  return (
    <div  className="flightresultspagemainbody">
        <section className="filterswrap">
           Filters to apply 
        </section>
      <article className="flightResultsWrap">

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
                  <h3>Carrier: {item.itineraries[0].segments[0].carrierCode}</h3>
                  <section className="flighttimesmainwrap">
                    <h1 className="flightTimesWrap">{new Date (item.itineraries[0].segments[0].departure.at).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}<br></br>{'('+item.itineraries[0].segments[0].departure.iataCode+')'}
                     </h1>
                     <article>
                        Duration and SVG. Direct
                     </article>
                    <h1> 
                   {new Date (item.itineraries[0].segments[0].arrival.at).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}<br></br> {' ('+item.itineraries[0].segments[0].arrival.iataCode+')'} </h1>
                    </section>
                  </div>
                  {/* <div>Meta</div> */}
                  <section className="flightdetailspricewrap">
                    <div className="pricewrap">Price: {item.price.total} {item.price.currency}</div>
                    <div><button className="selectflightbtn">Select</button></div>
                  </section>
              </article>
            </li>
          ))}
      </article>
      <section className="recommendedwrap">
           Recommended Flights/Stays
        </section>
    </div>
  );
}
export default FlightResultsWrap;
