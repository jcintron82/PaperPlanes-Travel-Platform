import "../../css/flightresults.css";
import { Header } from "../utility/header";
import { queryResponseObj } from "../utility/flightquerymodel";
import { FlightsSearchBar } from "../utility/searchbarflights";
import { useEffect, useState, useRef } from "react";
import adbanner from "../../images/resultspage/adbanner.avif";
import { useInView } from "react-intersection-observer";
import { FlightDetailsModal } from "./flightdetailsmodal";
import { useNavigate } from "react-router-dom";

//-------------End of img imports for rec travel tabs-------------//
export function FlightResultsWrap() {
  const [lowValueRef, setLowValueRef] = useState(
    queryResponseObj[0].message.data[0]
      ? parseInt(queryResponseObj[0].message.data[0].price.grandTotal)
      : null
  );
  const [highValueRef, setHighValueRef] = useState(
    queryResponseObj[0].message.data[0]
      ? queryResponseObj[0].message.data[
          queryResponseObj[0].message.data.length - 1
        ].price.grandTotal
      : null
  );
  const [infoModal, setInfoModal] = useState();
  const [refineReset, setRefineReset] = useState(false);
  const [flightResults, setResults] = useState(true);
  const [maxPrice, setMaxPrice] = useState(2000);
  const carrierIndex = useRef(queryResponseObj[0].carriers.length - 1);
  const [carrierRefineObject, setCarrierRefineObject] = useState(
 queryResponseObj[0].carriers[queryResponseObj[0].carriers.length - 1].carriers
  );
  const [selectIndex, setSelectIndex] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [flightsInfo, setFlightsInfo] = useState(
    queryResponseObj[0].filtered ? queryResponseObj[0].filtered : {}
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
  const convertAirlineCodes = () => {
    // for (let i = 0; i < flightsInfo.length; i++) {
    //   for (const [key, value] of Object.entries(
    //     queryResponseObj[1].carriers[0].carriers
    //   )) {
    //     if (flightsInfo[i].itineraries[0].segments[0].carrierCode === key)
    //       flightsInfo[i].itineraries[0].segments[0].carrierCode = value;
    //   }
    // }
  };
  const navigate = useNavigate();
  if (queryResponseObj[0].message.data.length === 0) {
    if (width < 1024) {
      setTimeout(() => {
        navigate("/");
      }, 7500);
    }
  }
  if (queryResponseObj[1].carriers[0]) {
    for (let i = 0; i < flightsInfo.length; i++) {
      for (const [key, value] of Object.entries(
        queryResponseObj[1].carriers[0].carriers
      )) {
        if (flightsInfo[i].itineraries[0].segments[0].carrierCode === key)
          flightsInfo[i].itineraries[0].segments[0].carrierCode = value;
      }
    }
  }

  useEffect(() => {
    // setLowValueRef(parseFloat(queryResponseObj[0].message.data[0].price.grandTotal) + 1)
    const selectedArr = [];
    //For the airline refinements
    Object.entries(checkedItems).forEach((element) => {
      if (element[1] === true) {
        selectedArr.push(element[0]);
      }
    });
    if (selectedArr.length > 0) {
      const filtered = queryResponseObj[0].filtered.filter((flight) => {
        return selectedArr.includes(flight.validatingAirlineCodes[0]);
      });
      // setFlightsInfo(filteredByPrice);
      const filteredByPrice = filtered.filter((flight) => {
        return flight.price
          ? parseFloat(flight.price.grandTotal) < maxPrice + 1
          : null;
      });
      setFlightsInfo(filteredByPrice);
    } else {
      const filteredByPrice = queryResponseObj[0].filtered.filter((flight) => {
        return flight.price
          ? parseFloat(flight.price.grandTotal) < maxPrice + 1
          : null;
      });
      setFlightsInfo(filteredByPrice);
    }

    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [checkedItems, queryResponseObj, maxPrice]);

  const filterFlights = (e, type, carrier) => {
    const key = e.target.value;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [key]: isChecked });
  };
  const flightFilterDropDownPricing = (input) => {
    const lowToHigh = flightsInfo.sort((flightA, flightB) => {
      const priceA = parseInt(flightA.id);
      const priceB = parseInt(flightB.id);
      return priceA + priceB;
    });
    const highToLow = lowToHigh.reverse();
    if (input === "priceLow") {
      //Do not take out the refineReset. Tracking flightsInfo in the useEffect
      //causes infinite re-renders. Leave the func like this and track refineReset
      setFlightsInfo(() => lowToHigh);
      setRefineReset(!refineReset);
    } else {
      setFlightsInfo(() => lowToHigh);
      setRefineReset(!refineReset);
    }
    console.log(flightsInfo);
  };
  const flightFilterTimes = (input) => {
    const filterByTimes = flightsInfo.sort((flightA, flightB) => {
      const durationA = new Date(flightA.itineraries[0].segments[0].arrival.at);
      const durationB = new Date(flightB.itineraries[0].segments[0].arrival.at);
      return durationA - durationB;
    });
    setFlightsInfo(filterByTimes);
    setRefineReset(!refineReset);
    console.log(flightsInfo);
  };
  const flightFilterDropDown = (e) => {
    const typeOfFilter = e.target.value;
    if (typeOfFilter === "priceLow" || typeOfFilter === "priceHigh") {
      flightFilterDropDownPricing(typeOfFilter);
    }
    if (typeOfFilter === "earlyDep" || typeOfFilter === "earlyArr") {
      flightFilterTimes(typeOfFilter);
    }
    // if (typeOfFilter === 'duration'){
    //   const lowToHighDuration = flightsInfo.sort((flightA, flightB) => {
    //     const durationA = flightA.itineraries[0].message.data;
    //     const durationB = flightB.itineraries[0].message.data;
    //     return durationA - durationB;
    //   });

    // }
  };

  //  const switchResultPreferences = (input) => {
  //   if (input === 'moreFlights'){
  //     setFlightsInfo(queryResponseObj[0].message.data);
  //     console.log("1389")
  //   }
  //   else if (input === 'lessFlights'){
  //     setFlightsInfo(queryResponseObj[0].filtered);
  //     console.log("5555")
  //   }
  //   else {
  //     console.log("BROKEN 145")
  //   }
  //   setResults(!flightResults);
  // };

  //   const filterByPrice = () => {

  //   };
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
            {/* <section>
              <h1>Stops</h1>
              <label aria-label="Nonstop">
                <h2>Nonstop</h2>
                <input type="checkbox"></input>
              </label>
              <label aria-label="Incls. Stops">
                <h2>Incl.Stops</h2>
                <input type="checkbox"></input>
              </label>
            </section> */}
            <section>
              <h1>Airlines</h1>
              {Object.entries(carrierRefineObject ? carrierRefineObject : {}).map(
                ([key, value], index) => {
                  return (
                    <label key={key} aria-label="Airlines">
                      <h2>{value}</h2>
                      <input
                        className="check"
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
                Max Price ${maxPrice}
                {maxPrice >= "2000" ? " +" : null}
                {console.log(maxPrice)}
              </h1>
              <label aria-label="Price">
                <input
                  type="range"
                  //The adding 1 and 2001 is to ensure theres always at least one
                  //ticket shown and that the subsequent range steps are correct
                  min={lowValueRef + 1}
                  max={lowValueRef + 2001}
                  step={500}
                  // value={maxPrice}
                  list="priceMarkers"
                  onChange={async (e) => {
                    if (e.target.value < 500) {
                      console.log(e.target.value);
                      setMaxPrice(() => Math.ceil(e.target.value));
                    } else {
                      console.log(e.target.value);
                      setMaxPrice(() => Math.floor(e.target.value / 100) * 100);
                    }
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
          <FlightsSearchBar
            setSearchState={() => setFlightsInfo(queryResponseObj.filtered)}
          />
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
            {queryResponseObj[0].message.data.length === 0 ? (
              <div className="noresultswrap">
                No Search Results Found<br></br>
                Please wait to be redirected to the search page shortly.
              </div>
            ) : (
              <p>
                Prices displayed include taxes and may change based on
                availability. You can review any additional fees before
                checkout. Prices are not final until you complete your purchase.
              </p>
            )}

            {/* <button>{flightResults  ? "All Flights" : "Less Flights"}</button> */}
          </section>
        ) : (
          <section className="desktopdisclaimerwrap">
            <p>
              <h1>Dont delay. Book today.</h1>
              <img src={adbanner}></img>
            </p>
            <hr></hr>
            {queryResponseObj[0].message.data.length === 0 ? (
              <div className="noresultswrap">
                No Search Results Found<br></br>
                Please use the search bar above to search for a different date
                or location(s).
              </div>
            ) : (
              <p>
                Prices displayed include taxes and may change based on
                availability. You can review any additional fees before
                checkout. Prices are not final until you complete your purchase.
              </p>
            )}
            {/* <button onClick={() => switchResultPreferences('moreFlights')}>{flightResults  ? "All Flights" : "Less Flights"}</button> */}
            <select
              className="filterselect"
              onChange={(e) => flightFilterDropDown(e)}
            >
              <option value="priceLow">Price (Low - High)</option>
              <option value="priceHigh">Price (High - Low)</option>
              {/* <option value="duration">Duration (Least to Most)</option> */}
              <option value="earlyArr">Earliest (Arrival)</option>
            </select>
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
                    <article className="carriernamewrap">
                      <h6>
                        {queryResponseObj.departure} to{" "}
                        {queryResponseObj.arrival}
                      </h6>
                      <span>{item.itineraries[0].segments[0].carrierCode}</span>
                    </article>
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
