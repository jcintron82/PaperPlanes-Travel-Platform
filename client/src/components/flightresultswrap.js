import "../css/flightresults.css";
import { Header } from "./utility/header";
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
      <Header />
      {/* <section>
        <label>tyh
          <input placeholder="">
          </input>
        </label>
      </section> */}
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
                <h3>
                  <span>{item.itineraries[0].segments[0].carrierCode}</span>{" "}
                  {"$" + item.price.total}{" "}
                </h3>
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
                  <article className="durationwrap">
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-takeoff</title>
                      <path d="M2.5,19H21.5V21H2.5V19M22.07,9.64C21.86,8.84 21.03,8.36 20.23,8.58L14.92,10L8,3.57L6.09,4.08L10.23,11.25L5.26,12.58L3.29,11.04L1.84,11.43L3.66,14.59L4.43,15.92L6.03,15.5L11.34,14.07L15.69,12.91L21,11.5C21.81,11.26 22.28,10.44 22.07,9.64Z" />
                    </svg>
                    <div className="durationtimelinewrap">
                      <p className="durationparatag">Duration 10hr</p>
                      <hr></hr>
                    </div>
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-landing</title>
                      <path d="M2.5,19H21.5V21H2.5V19M9.68,13.27L14.03,14.43L19.34,15.85C20.14,16.06 20.96,15.59 21.18,14.79C21.39,14 20.92,13.17 20.12,12.95L14.81,11.53L12.05,2.5L10.12,2V10.28L5.15,8.95L4.22,6.63L2.77,6.24V11.41L4.37,11.84L9.68,13.27Z" />
                    </svg>
                  </article>
                  <h1 className="flightTimesWrap">
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
                <div>
                  <button className="selectflightbtn">Select</button>
                </div>
              </section>
            </article>
          </li>
        ))}
      </article>
      <section className="recommendedwrap">
        <h1>Recommended Travels</h1>
        <button className="recommenedstaysbtns">Philadelphia</button>
        <button className="recommenedstaysbtns">Miami</button>
        <button className="recommenedstaysbtns">Vancouver</button>
      </section>
    </div>
  );
}
export default FlightResultsWrap;
