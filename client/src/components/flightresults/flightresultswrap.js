import "../../css/flightresults.css";
import { Header } from "../utility/header";
import { queryResponseObj } from "../utility/flightquerymodel";
import { FlightsSearchBar } from "../utility/searchbarflights";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CSSTransition } from "react-transition-group";
import { FlightDetailsModal } from "./flightdetailsmodal";
import londonimg from "../../images/home/london.avif";
import nycimg from "../../images/home/nyc.avif";
import miamiimg from "../../images/home/miami.avif";
import sanfranimg from "../../images/home/sanfran.avif";
import adoneimg from "../../images/home/adone.avif";


//-------------End of img imports for rec travel tabs-------------//
export function FlightResultsWrap() {
  const [infoModal, setInfoModal] = useState();
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectIndex, setSelectIndex] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [flightsInfo, setFlightsInfo] = useState(
    queryResponseObj[0].message.data ? queryResponseObj[0].message.data : null
  );
  const [checkedItems, setCheckedItems] = useState({});
  const [metaInfoRef, refInView] = useInView({
    threshold: 1,
    // rootMargin:
  });
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const filteredCarriers = [];
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
    console.log(queryResponseObj)
    const selectedArr = [];
    Object.entries(checkedItems).forEach((element) => {
      if (element[1] === true) {
        selectedArr.push(element[0]);
        const filtered = queryResponseObj[0].message.data.filter((flight) => {
          selectedArr.includes(flight.validatingAirlineCodes[0]);
        });
        setFlightsInfo(filtered);
      }
      if (selectedArr.length === 0) {
        setFlightsInfo(queryResponseObj[0].message.data);
      }
    },[flightsInfo]);
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [checkedItems]);

  const filterFlights = (e, type, carrier) => {
    const key = e.target.value;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [key]: isChecked });
    if (e.target.checked === true) {
    }
  };
  const filterByPrice = () => {
    console.log(queryResponseObj);
    const filtered = flightsInfo.filter((flight) => {
      const num = parseFloat(flight.travelerPricings[0].price.total);
      return num < maxPrice;
    });
    console.log(maxPrice);
    console.log(filtered);
    setFlightsInfo(filtered);
  };
  return (
    <div
      className={
        infoModal
          ? "flightresultspagemainbody hiddenresults"
          : "flightresultspagemainbody"
      }
    >
      <Header 
        headerClass={"headercolored"}
        link={"logolinkcolor"}
        planeSVG={"paperplanesvgcolored"}
        profileSVG={"accountsvgcolored"} 
              />
      <article
        className={
          infoModal ? "flightResultsWrapOpenModal" : "flightResultsWrap"
        }
      >
        {/* <CSSTransition 
          in={refInView}
          classNames={refInView ? "refinewraptop" : "refinewrapscrolled"}
          timeout={1000}
          
          > */}
        {width > 1100 ? (
          <aside className={"refinewraptop"}>
            <section>
              <h1>Stops</h1>
              <label aria-label="Nonstop">
                <h2>Nonstop</h2>
                <input type="checkbox"></input>
              </label>
              <label aria-label="Incls. Stops">
                <h2>Incl.Stops</h2>
                <input type="checkbox"></input>
              </label>
            </section>
            <section>
              <h1>Airlines</h1>
              {Object.entries(queryResponseObj[1].carriers[0].carriers).map(
                ([key, value], index) => {
                  return (
                    <label key={key} aria-label="Airlines">
                      <h2>{value}</h2>
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
            </section>
            <section>
              <h1>
                Max Price {maxPrice}
                {maxPrice === "2000" ? "+" : null}
              </h1>
              <label aria-label="Price">
                <input
                  type="range"
                  min={0}
                  max={2500}
                  step={500}
                  value={maxPrice}
                  list="priceMarkers"
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    console.log(maxPrice);
                    filterByPrice();
                  }}
                ></input>
                <datalist id="priceMarkers">
                  <option value={0} label="$0"></option>
                  <option value={500} label="$500"></option>
                  <option value={1000} label="$1000"></option>
                  <option value={1500} label="$1500"></option>
                  <option value={2000} label="Custom Value"></option>
                </datalist>
              </label>
            </section>
            <section className="timebtnswrap">
              <button aria-label="Morning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>sun-angle</title>
                  <path d="M13.8 5.2C13 5 12.2 5 11.4 5L14.6 2.3L16 6.3C15.3 5.8 14.6 5.5 13.8 5.2M7 7.1C7.6 6.5 8.3 6 9 5.7L4.9 4.9L5.6 9C6 8.3 6.4 7.6 7 7.1M5.2 13.8C5 13 5 12.2 5 11.4L2.3 14.6L6.3 16C5.8 15.4 5.4 14.6 5.2 13.8M22 19V21H3L8.4 15.5C6.5 13.5 6.5 10.4 8.4 8.4C10.3 6.5 13.5 6.5 15.4 8.4L18.4 5.4L19.8 6.8L7.7 19H22Z" />
                </svg>
                Morning
              </button>
              <button aria-label="Afternoon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>sun-clock</title>
                  <path d="M18.1 9.3L19.6 6L15.5 5.6C16.1 6.1 16.6 6.7 17 7.5C17.3 8.1 17.5 8.6 17.7 9.2C17.2 9.1 16.6 9 16 9H15.6C14.8 7.2 13.1 6 11 6C8.2 6 6 8.2 6 11C6 13.1 7.2 14.8 9 15.6V16C9 19.9 12.1 23 16 23S23 19.9 23 16C23 12.9 20.9 10.2 18.1 9.3M16 21C13.2 21 11 18.8 11 16S13.2 11 16 11 21 13.2 21 16 18.8 21 16 21M16.5 16.2L19.4 17.9L18.6 19.1L15 17V12H16.5V16.2M11 4C10.2 4 9.4 4.2 8.6 4.4L11 1L13.4 4.4C12.6 4.2 11.8 4 11 4M4.9 14.5C5.3 15.2 5.9 15.9 6.5 16.4L2.4 16L4.2 12.2C4.3 13 4.5 13.8 4.9 14.5M4.1 9.8L2.3 6L6.5 5.7C5.9 6.2 5.4 6.8 4.9 7.5C4.5 8.2 4.2 9 4.1 9.8Z" />
                </svg>
                Afternoon
              </button>
              <button aria-label="Night">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>moon-waning-crescent</title>
                  <path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z" />
                </svg>
                Night
              </button>
            </section>
          </aside>
        ) : null}
        {/* </CSSTransition> */}
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
        {width >= 1024 ? (
         <FlightsSearchBar updateState={() => setFlightsInfo(queryResponseObj[0].message.data)}/>
        ) : null}
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
        <section className="flightparent">
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
                  <div className="carrierwrap">
                    {" "}
                    <h1 className="pricemain">
                      {"$" + item.travelerPricings[0].price.total}{" "}
                      <span className="perticketdisclaimer">
                        {queryResponseObj[0].message.data[0].itineraries[0]
                          .segments[1]
                          ? "Round-trip "
                          : "One-way "}
                        per traveler
                      </span>
                    </h1>
                    <button>View Flight</button>
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
          {/* {width >= 1440 ? (
            <article
              className={refInView ? "adbannerfadeout" : "adbanner"}
            ></article>
          ) : null} */}
        </section>
      </article>
    </div>
  );
}
export default FlightResultsWrap;
