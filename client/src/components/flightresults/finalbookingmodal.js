import { queryResponseObj } from "../utility/flightquerymodel";
const bookingInfo = queryResponseObj.finalBookingInfo ? queryResponseObj.finalBookingInfo.result : null;
export const FinalBookingModal = ({ isOpen }) => {
    {console.log(queryResponseObj)}
//    ' https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from%3ASan+Francisco+%28SFO+-+San+Francisco+Intl.%29%2Cto%3ATampa+%28TPA+-+Tampa+Intl.%29%2Cdeparture%3A5%2F5%2F2023TANYT&options=cabinclass%3Aeconomy&leg2=from%3ATampa+%28TPA+-+Tampa+Intl.%29%2Cto%3ALos+Angeles+%28LAX+-+Los+Angeles+Intl.%29%2Cdeparture%3A5%2F6%2F2023TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY&fromDate=5%2F5%2F2023&toDate=5%2F6%2F2023&d1=2023-05-05&d2=2023-05-06'
    return (
        <article className="mainarticle">
            <div>Unforunately, we're still too new on the scene
                and waiting on approval for the production level booking API permit
                from the FAA. <br></br>Want to show your support in helping us obtain this? 
                Send an email to XXXXX with your OrderID and if applicable, PaperPlanes
                username.  
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>emoticon-frown-outline</title><path d="M12 2C6.47 2 2 6.5 2 12S6.47 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M12 20C7.58 20 4 16.42 4 12S7.58 4 12 4 20 7.58 20 12 16.42 20 12 20M15.5 11C16.33 11 17 10.33 17 9.5S16.33 8 15.5 8 14 8.67 14 9.5 14.67 11 15.5 11M8.5 11C9.33 11 10 10.33 10 9.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11M12 13.5C9.67 13.5 7.69 14.96 6.89 17H17.11C16.31 14.96 14.33 13.5 12 13.5Z" /></svg>
          <ul>
            <li>Flight Order {queryResponseObj.departure.slice(0, -5)} to {queryResponseObj.arrival.slice(0, -5)}<br></br>
            Return? {bookingInfo.data.flightOffers[0].itineraries[1]? 'Y' : 'N'}
            </li>
            <li>Flight ID: {bookingInfo.data.id}</li>
            <li>Booking Reference ID: {bookingInfo.data.associatedRecords[0].reference}</li>
            <li>Traveler Count: {Object.entries(queryResponseObj[1].travelerCounts).map((item) => {
               return ( <div>{item[0]}:{item[1]}</div>
               )
            })}</li>
            <li>Base: ${bookingInfo.data.flightOffers[0].price.base} | Taxes & Fee's: ${(bookingInfo.data.flightOffers[0].price.total - bookingInfo.data.flightOffers[0].price.base).toFixed(2)} | Total: ${bookingInfo.data.flightOffers[0].price.total} </li>
          </ul>
          <p>Our only goal here at PaperPlanes is to get you to your destination safe and sound.
            We may not have been able to serve you today but here are links to some services that can!
            <a href="https://www.expedia.com">Expedia</a>
          </p>
        </article>
    )
}

export default FinalBookingModal;