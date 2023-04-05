import "../../css/flightresults.css";
import { Header } from "../utility/header";
import { queryResponseObj } from "../utility/flightquerymodel";
import { RecommendedTravelsTabs } from "./flightpagerectraveltabs";
import { useState } from "react";
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

  const flightsInfo = queryResponseObj[0].message.data.flightOffers;
  let imgArr = [londonimg, nycimg, miamiimg, sanfranimg, adoneimg];

  //This block is necessary for converting the carrier codes into full names
  //The other option is use the carrier code API but this was the DRYest solution
  // for (let i = 0; i < flightsInfo.length; i++) {
  //   for (const [key, value] of Object.entries(queryResponseObj[0].carriers)) {
  //     if (flightsInfo[i].itineraries[0].segments[0].carrierCode === key)
  //       flightsInfo[i].itineraries[0].segments[0].carrierCode = value;
  //   }
  // }
  return (
    <div className={infoModal ? "flightresultspagemainbody hiddenresults" : "flightresultspagemainbody"}>
      <Header />
      {console.log(queryResponseObj)}
      <article className={infoModal ? "flightResultsWrapOpenModal" : "flightResultsWrap"}>
      {infoModal ? (
              <FlightDetailsModal
                tripTypeTwoWay={ flightsInfo[selectIndex].itineraries[1] ? true : false}
                originLocation={
                  " (" +
                  flightsInfo[selectIndex].itineraries[0].segments[0].departure.iataCode +
                  ")" +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[0].segments[0].departure.terminal
                }
                originDepartureTime={new Date(
                  flightsInfo[selectIndex].itineraries[0].segments[0].departure.at
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                arrivalLocation={
                  " (" +
                  flightsInfo[selectIndex].itineraries[0].segments[0].arrival.iataCode +
                  ")" +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[0].segments[0].arrival.terminal
                }
                arrivalTime={new Date(
                  flightsInfo[selectIndex].itineraries[0].segments[0].arrival.at
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                returnTripOrigin={
                  flightsInfo[selectIndex].itineraries[1] ?
                  " (" +
                  flightsInfo[selectIndex].itineraries[1].segments[0].departure.iataCode +
                  ")" +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[1].segments[0].departure.terminal :
                  null
                }
                returnDepartureTime={ flightsInfo[selectIndex].itineraries[1] ? new Date(
                  flightsInfo[selectIndex].itineraries[1].segments[0].departure.at
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : null}
                returnArrival={
                  flightsInfo[selectIndex].itineraries[1] ?
                  " (" +
                  flightsInfo[selectIndex].itineraries[1].segments[0].arrival.iataCode +
                  ") " +
                  " Terminal " +
                  flightsInfo[selectIndex].itineraries[1].segments[0].arrival.terminal :
                  null
                }
                returnArrivalTime={ flightsInfo[selectIndex].itineraries[1] ? new Date(
                  flightsInfo[selectIndex].itineraries[1].segments[0].arrival.at
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : null}
//---------------End of departure/arrival inputs block---------------------//
                perTicketPrice={"$" + flightsInfo[selectIndex].travelerPricings[0].price.total}
                totalPrice={"$" + flightsInfo[selectIndex].price.total}
                cabinClass={flightsInfo[selectIndex].travelerPricings[0].fareDetailsBySegment[0].cabin}
                includedCheckedbags={flightsInfo[selectIndex].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}
                infoModalClose={() =>{ setInfoModal(false) }}
                numAdults={queryResponseObj[0].travelerCounts.adults}
                numChildren={queryResponseObj[0].travelerCounts.children}
                flightID={selectIndex}
              />
            ) : null}{" "}
        {flightsInfo.map((item, index) => (
          <li
            // className={
            //   deleteIndex === index ? "highlightselectedproduct" : "priceli"
            // }
            key={index}
          >
            <article className="flightResultsTabs">
              <div className="flightmaindetailswrap">
                <div>
                  <div className="carrierwrap">
                    <span>{item.itineraries[0].segments[0].carrierCode}</span>
                  {" "}
                  <h1>
                    {"$" + item.travelerPricings[0].price.total}{" "}
                    <span className="perticketdisclaimer">per ticket</span>
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
                  <article className="durationwrap">
                    <div className="planesvgwrap">
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-takeoff</title>
                      <path d="M2.5,19H21.5V21H2.5V19M22.07,9.64C21.86,8.84 21.03,8.36 20.23,8.58L14.92,10L8,3.57L6.09,4.08L10.23,11.25L5.26,12.58L3.29,11.04L1.84,11.43L3.66,14.59L4.43,15.92L6.03,15.5L11.34,14.07L15.69,12.91L21,11.5C21.81,11.26 22.28,10.44 22.07,9.64Z" />
                    </svg></div>
                    <div className="durationtimelinewrap">
                     
                      <hr></hr>
                    </div>
                    <div className="planesvgwrap">
                    <svg
                      className="durationplanesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>airplane-landing</title>
                      <path d="M2.5,19H21.5V21H2.5V19M9.68,13.27L14.03,14.43L19.34,15.85C20.14,16.06 20.96,15.59 21.18,14.79C21.39,14 20.92,13.17 20.12,12.95L14.81,11.53L12.05,2.5L10.12,2V10.28L5.15,8.95L4.22,6.63L2.77,6.24V11.41L4.37,11.84L9.68,13.27Z" />
                    </svg></div>
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
                  <button
                    onClick={() =>{  setInfoModal(true); setSelectIndex(index); }}
                    className="selectflightbtn"
                  >
                    Select
                  </button>
                </div>
              </section>
            </article>
          </li>
        ))}
      </article>
      <section className={infoModal ? "detailswrapblurred recommendedwrap" : "recommendedwrap"}>
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
      </section>
    </div>
  );
}
export default FlightResultsWrap;
