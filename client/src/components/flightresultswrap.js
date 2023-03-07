import "../css/flightresults.css";
import { queryResponseObj } from "./utility/flightquerymodel";

export function FlightResultsWrap() {
  const flightsInfo = queryResponseObj[0].message.data;

  //This block is necessary for converting the carrier codes into full names
  //The other option is use the carrier code API but this was the DRYest solution
  for (let i = 0; i < flightsInfo.length; i++) {
    for (const [key, value] of Object.entries(queryResponseObj[0].carriers)) {
      if (flightsInfo[i].itineraries[0].segments[0].carrierCode === key)
        flightsInfo[i].itineraries[0].segments[0].carrierCode = value;
    }
  }
  return (
    <div className="flightresultspagemainbody">
      <section className="filterswrap">Filters to apply</section>
      <article className="flightResultsWrap">
        {flightsInfo.map((item, index) => (
          <li
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
                  <h1 className="flightTimesWrap">
                    {new Date(
                      item.itineraries[0].segments[0].departure.at
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br></br>
                    {"(" +
                      item.itineraries[0].segments[0].departure.iataCode +
                      ")"}
                  </h1>
                  <article>Duration and SVG. Direct</article>
                  <h1>
                    {new Date(
                      item.itineraries[0].segments[0].arrival.at
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br></br>{" "}
                    {" (" +
                      item.itineraries[0].segments[0].arrival.iataCode +
                      ")"}{" "}
                  </h1>
                </section>
              </div>
              <section className="flightdetailspricewrap">
                <div className="pricewrap">
                  Price: {item.price.total} {item.price.currency}
                </div>
                <div>
                  <button className="selectflightbtn">Select</button>
                </div>
              </section>
            </article>
          </li>
        ))}
      </article>
      <section className="recommendedwrap">Recommended Flights/Stays</section>
    </div>
  );
}
export default FlightResultsWrap;
