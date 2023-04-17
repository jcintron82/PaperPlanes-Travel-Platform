import "../../css/flightresults.css";
import { Header } from "../utility/header";
import { queryResponseObj } from "../utility/flightquerymodel";
import { RecommendedTravelsTabs } from "./flightpagerectraveltabs";
import { useEffect, useState } from "react";
import { FlightDetailsModal } from "./flightdetailsmodal";
import londonimg from "../../images/home/london.avif";
import nycimg from "../../images/home/nyc.avif";
import miamiimg from "../../images/home/miami.avif";
import sanfranimg from "../../images/home/sanfran.avif";
import adoneimg from "../../images/home/adone.avif";

//-------------End of img imports for rec travel tabs-------------//
export function FlightResultsWrap() {
  const [infoModal, setInfoModal] = useState();
  const [selectIndex, setSelectIndex] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [flightsInfo, setFlightsInfo] = useState(
    queryResponseObj[0].message.data.flightOffers
  );
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const filteredCarriers = [];
  const convertedIataLocations = Object.values(
    queryResponseObj[1].carriers[0].locations
  );
  //This block is necessary for converting the carrier codes into full names
  //The other option is use the carrier code API but this was the DRYest solution
  for (let i = 0; i < flightsInfo.length; i++) {
    for (const [key, value] of Object.entries(
      queryResponseObj[1].carriers[0].carriers
    )) {
      if (flightsInfo[i].itineraries[0].segments[0].carrierCode === key)
        flightsInfo[i].itineraries[0].segments[0].carrierCode = value;
    }
  }
  const convertAirlineCodes = (obj) => {
    for (let i = 0; i < flightsInfo.length; i++) {
      for (const [key, value] of Object.entries(
        queryResponseObj[1].carriers[0].carriers
      )) {
        if (flightsInfo[i].itineraries[0].segments[0].carrierCode === value)
          flightsInfo[i].itineraries[0].segments[0].carrierCode = key;
      }
    }
  };
  useEffect(() => {
    const selectedArr = [];
    Object.entries(checkedItems).forEach((element) => {
      if (element[1] === true) {
        selectedArr.push(element[0]);
        const filtered = queryResponseObj[0].message.data.flightOffers.filter(
          (flight) => selectedArr.includes(flight.validatingAirlineCodes[0])
        );
        setFlightsInfo(filtered);
      }
      if (selectedArr.length === 0) {
        setFlightsInfo(queryResponseObj[0].message.data.flightOffers);
      }
    });
  }, [checkedItems]);

  const filterFlights = (e, type, carrier) => {
    const key = e.target.value;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [key]: isChecked });
    if (e.target.checked === true) {
    }
  };

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  });
  return (
    <div
      className={
        infoModal
          ? "flightresultspagemainbody hiddenresults"
          : "flightresultspagemainbody"
      }
    >
      <Header headerClass="headermainwrap" />
      <article
        className={
          infoModal ? "flightResultsWrapOpenModal" : "flightResultsWrap"
        }
      >
        {width > 1100 ? (
          <article>
            <h1>Airlines</h1>
            {Object.entries(queryResponseObj[1].carriers[0].carriers).map(
              ([key, value], index) => {
                return (
                  <label key={key}>
                    {value}
                    <input
                      value={key}
                      onChange={(e) => {
                        filterFlights(e, "airlines", key);
                        filteredCarriers.push(key);
                      }}
                      type="checkbox"
                    ></input>
                  </label>
                );
              }
            )}
          </article>
        ) : null}
        {infoModal ? (
          <FlightDetailsModal
            tripTypeTwoWay={
              flightsInfo[selectIndex].itineraries[1] ? true : false
            }
            originLocation={
              " (" +
              flightsInfo[selectIndex].itineraries[0].segments[0].departure
                .iataCode +
              ")" +
              " Terminal " +
              flightsInfo[selectIndex].itineraries[0].segments[0].departure
                .terminal
            }
            originDepartureTime={new Date(
              flightsInfo[selectIndex].itineraries[0].segments[0].departure.at
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            arrivalLocation={
              " (" +
              flightsInfo[selectIndex].itineraries[0].segments[0].arrival
                .iataCode +
              ")" +
              " Terminal " +
              flightsInfo[selectIndex].itineraries[0].segments[0].arrival
                .terminal
            }
            arrivalTime={new Date(
              flightsInfo[selectIndex].itineraries[0].segments[0].arrival.at
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            returnTripOrigin={
              flightsInfo[selectIndex].itineraries[1]
                ? " (" +
                  flightsInfo[selectIndex].itineraries[1].segments[0].departure
                    .iataCode +
                  ")" +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[1].segments[0].departure
                    .terminal
                : null
            }
            returnDepartureTime={
              flightsInfo[selectIndex].itineraries[1]
                ? new Date(
                    flightsInfo[
                      selectIndex
                    ].itineraries[1].segments[0].departure.at
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null
            }
            returnArrival={
              flightsInfo[selectIndex].itineraries[1]
                ? " (" +
                  flightsInfo[selectIndex].itineraries[1].segments[0].arrival
                    .iataCode +
                  ") " +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[1].segments[0].arrival
                    .terminal
                : null
            }
            returnArrivalTime={
              flightsInfo[selectIndex].itineraries[1]
                ? new Date(
                    flightsInfo[
                      selectIndex
                    ].itineraries[1].segments[0].arrival.at
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null
            }
            //---------------End of departure/arrival inputs block---------------------//
            perTicketPrice={
              "$" + flightsInfo[selectIndex].travelerPricings[0].price.total
            }
            totalPrice={"$" + flightsInfo[selectIndex].price.total}
            cabinClass={
              flightsInfo[selectIndex].travelerPricings[0]
                .fareDetailsBySegment[0].cabin
            }
            includedCheckedbags={
              flightsInfo[selectIndex].travelerPricings[0]
                .fareDetailsBySegment[0].includedCheckedBags.quantity
            }
            infoModalClose={() => {
              setInfoModal(false);
            }}
            numAdults={queryResponseObj[0].travelerCounts.adults}
            numChildren={queryResponseObj[0].travelerCounts.children}
            flightID={selectIndex}
          />
        ) : null}{" "}
        <article className="flightmetainfowrap">
          <p>
            {convertedIataLocations[0].cityCode} to{" "}
            {convertedIataLocations[1].cityCode}
            <br></br> Apr 29 - Apr 30
          </p>
          <form className="metainfoform">
            <label>
              <input placeholder="Flying From"></input>
            </label>
            <label>
              <input placeholder="Flying To"></input>
            </label>
            <label>
              <input type="date"></input>
            </label>
            <label>
              <input type="date"></input>
            </label>
            <button>Search</button>
          </form>
        </article>
        {width < 1100 ? (
          <section className="mobiledisclamier">
            <button className="filterbtn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>filter</title>
                <path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
              </svg>
              Sort & Filter
            </button>
            <hr></hr>
            <p>
              Prices displayed include taxes and may change based on
              availability. You can review any additional fees before checkout.
              Prices are not final until you complete your purchase.
            </p>
          </section>
        ) : (
          <section className="desktopdisclaimerwrap">
            <h1>Your PlaceHolder</h1>
            <hr></hr>
            <p>
              Prices displayed include taxes and may change based on
              availability. You can review any additional fees before checkout.
              Prices are not final until you complete your purchase.
            </p>
          </section>
        )}
        {flightsInfo.map((item, index) => (
          <button
            className="ticketbtns"
            type="button"
            onClick={() => {
              setInfoModal(true);
              setSelectIndex(index);
            }}
            // className={
            //   deleteIndex === index ? "highlightselectedproduct" : "priceli"
            // }
            key={index}
          >
            <article className="flightResultsTabs">
              <div className="flightmaindetailswrap">
                <div>
                  <div className="carrierwrap">
                    {" "}
                    <h1 className="pricemain">
                      {"$" + item.travelerPricings[0].price.total}{" "}
                      <span className="perticketdisclaimer">
                        {queryResponseObj[0].message.data.flightOffers[0]
                          .itineraries[0].segments[1]
                          ? "Round-trip "
                          : "One-way "}
                        per traveler
                      </span>
                    </h1>
                  </div>
                </div>
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
                  <hr></hr>
                  <article className="durationwrap">
                    {/* <div className="planesvgwrap">
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-takeoff</title>
                      <path d="M2.5,19H21.5V21H2.5V19M22.07,9.64C21.86,8.84 21.03,8.36 20.23,8.58L14.92,10L8,3.57L6.09,4.08L10.23,11.25L5.26,12.58L3.29,11.04L1.84,11.43L3.66,14.59L4.43,15.92L6.03,15.5L11.34,14.07L15.69,12.91L21,11.5C21.81,11.26 22.28,10.44 22.07,9.64Z" />
                    </svg></div> */}

                    {/* <div className="planesvgwrap">
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-landing</title>
                      <path d="M2.5,19H21.5V21H2.5V19M9.68,13.27L14.03,14.43L19.34,15.85C20.14,16.06 20.96,15.59 21.18,14.79C21.39,14 20.92,13.17 20.12,12.95L14.81,11.53L12.05,2.5L10.12,2V10.28L5.15,8.95L4.22,6.63L2.77,6.24V11.41L4.37,11.84L9.68,13.27Z" />
                    </svg></div> */}
                  </article>
                  <h1 className="flightTimesWrap">
                    {new Date(
                      item.itineraries[0].segments[0].arrival.at
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" (" +
                      item.itineraries[0].segments[0].arrival.iataCode +
                      ")"}{" "}
                  </h1>
                  <h6>San Francisco TO Los Angeles</h6>
                  <span>{item.itineraries[0].segments[0].carrierCode}</span>
                </section>
              </div>
              <section className="flightdetailspricewrap">
                <div></div>
              </section>
            </article>
          </button>
        ))}
      </article>
      {/* <section className={infoModal ? "detailswrapblurred recommendedwrap" : "recommendedwrap"}>
        <h1>Recommended Travels</h1>
        <RecommendedTravelsTabs
          bgImg={imgArr[0]}
          className="recommenedstaysbtns"
          text="London"
        />
        <RecommendedTravelsTabs
          bgImg={imgArr[2]}
          className="recommenedstaysbtns"
          text="Miami"
        />
        <RecommendedTravelsTabs
          bgImg={imgArr[1]}
          className="recommenedstaysbtns"
          text="NYC"
        />
      </section> */}
    </div>
  );
}
export default FlightResultsWrap;
