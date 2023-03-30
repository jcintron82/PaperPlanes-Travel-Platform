import { useState, useEffect } from "react";
import { queryResponseObj } from "../utility/flightquerymodel";
import { TravelerInfoModal } from './travelerInfoModal'
import "../../css/flightresults/detailsmodal.css";
import "../../css/flightresults/travelersinfomodal.css";
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
  cabinClass,
  totalPrice,
  includedCheckedbags,
  infoModalClose,
  numAdults,
  numChildren,
  flightID
}){
  const [returnOrigin, setReturnOrigin] = useState();
  const [travelerInfoModal, setTravelerInfoModal] = useState(false);
  const [emailScreen, setEmailScreen] = useState(true);
  const [travelerInfoscren, setTravelerInfoScreen] = useState(false);
  const [documentsScreen, setDocumentsScreen] = useState(false);
  const travelerInfo = {
    title:'',
    firstName:'',
    middleName:'',
    lastName:'',
    suffix:'',

  };
  
  useEffect(() => {
    setReturnOrigin(returnTripOrigin);
  });
  const confirmFlightOffer = async () => {
    console.log(queryResponseObj[1].message.data[1])
    //Converting the converted carrier code back to its airline code for
    //search purposes
    // queryResponseObj[1].message.data[1].itineraries[0].segments[0].carrierCode = 
    // queryResponseObj[1].message.data[1].itineraries[0].segments[0].operating.carrierCode;
    // queryResponseObj[1].message.data[1].itineraries[1].segments[0].carrierCode = 
    // queryResponseObj[1].message.data[1].itineraries[1].segments[0].operating.carrierCode;
      const pull = await fetch("http://localhost:8000/flightconfirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryResponseObj[1].message.data[3])
      });
      const x = await pull.json()
      console.log(pull)
      console.log(x)
  }
    const recordOrderEmail = () => {
      setEmailScreen(false);
      setTravelerInfoScreen(true);
    };
  const endTravelerInfoModal = () => {
    setTravelerInfoModal(false);
  }
 
  return (
    <article className="flightdetailmodalwrap">
      { travelerInfoModal ? <TravelerInfoModal btnClick={() => endTravelerInfoModal()(false)}openModal={travelerInfoModal}/> : null}
      <button onClick={infoModalClose} className="closemodalbtn">X</button>
      <section className="metainfowrap">
        <p className="pricingparagraph"><h1 className="finalpricingwrap">Tickets:<br></br> {perTicketPrice}/ea</h1><h1  className="finalpricingwrap">Total:<br></br> {totalPrice}</h1></p>
        <div className="modaltravelerswrap">{numAdults} Adults<br></br> {numChildren} Children <div className="cabinwrap">Cabin:<br></br> {cabinClass}</div></div>
        <div className="luggagewrap">Incl. Checked Luggage: {includedCheckedbags}</div>
      </section>


    <div className="durationdesktopwrap">
      
      <section className="durationandstopswrap">
        <div className="timeswrap">
          {originLocation}
          <br></br> {originDepartureTime}
        </div>
        <div className="durationdetailswrap">
          <svg
            className="arrowsvgs"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            ></path>
          </svg>
        </div>
        <div className="timeswrap">
        {arrivalLocation} <br></br>
        {arrivalTime}
        </div>
      </section>
      {tripTypeTwoWay === true ? (
        <section className="durationandstopswrap">
        <div className="timeswrap">
          {returnArrival}
          <br></br>
          {returnArrivalTime}
        </div>
          <div className="durationdetailswrap">
            <svg
              className="arrowsvgs"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              ></path>
            </svg>
          </div>
          <div className="timeswrap">
          {returnTripOrigin}
          <br></br>
          {returnDepartureTime}{" "}
          </div>
        </section>
      ) : null}</div>
      {/* <div>Layovers</div> */}
      <div  className="offerbtnwrap"><button onClick={() => setTravelerInfoModal(true)}>Get This flight</button><button onClick={confirmFlightOffer} className="selectOfferBtn">Buy Offer</button></div>
    </article>
  );
}
export default FlightDetailsModal;
