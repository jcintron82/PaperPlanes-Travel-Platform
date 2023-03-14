import { useState, useEffect } from "react";
import "../../css/flightresults/detailsmodal.css";

export function FlightDetailsModal({
  tripTypeTwoWay,
  originLocation,
  originDepartureTime,
  arrivalLocation,
  arrivalTime,
  returnTripOrigin,
  returnDepartureTime,
  returnArrival,
  returnArrivalTime,
  perTicketPrice,
  fees,
  totalPrice


}) {
    const [returnOrigin, setReturnOrigin] = useState();

    useEffect(() => {
        setReturnOrigin(returnTripOrigin)
    })
  return (
    <article className="flightdetailmodalwrap">
      <button>Close</button>
      <section>Tickets: {perTicketPrice}/ea{fees}<br></br>
      # Adults # Children<br></br>
        Trip Total: {totalPrice}</section>
        <section className="durationandstopswrap">
            <div className="timeswrap">{originLocation}<br></br> {originDepartureTime}</div>
        <div className="durationdetailswrap"><svg className="arrowsvgs" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
</svg></div>
        {arrivalLocation} <br></br>{arrivalTime}</section>
        {tripTypeTwoWay === true ? <section className="durationandstopswrap">
        {returnTripOrigin}<br></br>{returnDepartureTime}
          <div className="durationdetailswrap"><svg className="arrowsvgs" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
</svg></div>
        {returnArrival}<br></br>{returnArrivalTime}</section> : null}
        <div>Layovers</div>
        

      {/* <div className="tickettotalswrap">Each tickets and the total price</div>
      <div className="durationandstopswrap">
        Each tickets and the total price
      </div>
      <section>Each tickets and the total price</section>
      <section>Each tickets and the total price</section> */}
      <button>Buy Offer</button>
    </article>
  );
}
export default FlightDetailsModal;
