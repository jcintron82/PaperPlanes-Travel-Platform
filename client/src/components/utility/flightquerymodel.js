import "../../css/flightresults.css";
import "../../css/utility/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export { FlightSearchModal, queryResponseObj };
const queryResponseObj = [];

function FlightSearchModal() {
  const [departureLocation, setDepartureLocation] = useState([]);
  const [oneWay, setOneWay] = useState(true);
  const [roundTripSelected, setRoundTrip] = useState(true);

  const [queryRecieved, setQueryStatus] = useState();
  const navigate = useNavigate();

  const body = {
    departure: "",
    departureDate: "",
    arrival: "",
    numOfTravelers: 1,
    returnDate: "",
    maxPrice: 5000,
    flightClass: 'ECONOMY',
  };
  const flightQuery = async (e) => {
    e.preventDefault();
    try {
      const pull = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await pull.json();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
    const pull = await fetch("http://localhost:8000/query");
    const data = await pull.json();
    // setDepartureLocation(data.message.data);
    setQueryStatus(!queryRecieved);
    queryResponseObj[0] = data;
    console.log(queryResponseObj);
    navigate("/flightquery");
    return { message: queryResponseObj };
  };
  const selectTripType = (value) => {
    setRoundTrip(value);
  };
  const recordDepartureLoc = (e,) => {
    body.departure = e.target.value;
  };
  const recordDepartureDate = (e) => {
    body.departureDate = e.target.value;
  };
  const recordReturnDate = (e) => {
    body.returnDate = e.target.value;
  };
  const updateSearchParams = (e, valueToUpdate) => {
    body[valueToUpdate] = e.target.value;
  };
  const updateSearchParamsNum = (e, valueToUpdate) => {
    body[valueToUpdate] = parseInt(e.target.value);
  };
  return (
    <div className="mainsearchwrap">
      {" "}
     
        <form className="flightsearchform">
        <section className="flighttypebtnwrap">
      <button type="button" onClick={(e) => selectTripType(false)}>
      One-Way
      </button>
      <button type="button" onClick={(e) => selectTripType(true)}>
      Round-Trip
      </button>
      </section>
          <label className="locationinputswrap">
            <input
              className="locationinputs"
              required
              onChange={(e) => updateSearchParams(e, 'departure')}
              placeholder="Departing From..."
            ></input>
            <input
              className="locationinputs"
              required
              onChange={(e) => updateSearchParams(e, 'arrival')}
              placeholder="Arriving To..."
            ></input>
          </label>
          <section className="addOnsWrap">
          {roundTripSelected ? (
            <div className="dateselectionwrap">
              <input
                required
                onChange={(e) => updateSearchParams(e, 'departureDate')}
                type="date"
              ></input>
              <input
                required
                onChange={(e) => updateSearchParams(e, 'returnDate')}
                type="date"
              ></input>
            </div>
          ) : (
            <label className="dateselectionwrap">
              <input
                required
                onChange={(e) => updateSearchParams(e, 'departureDate')}
                type="date"
              ></input>
            </label>
          )}<span className="passangerselectwrap">
          <div className="maxpricewrap">
            <label className="maxpricelabelwrap">Number of Passengers
            <select required onChange={(e) => updateSearchParamsNum(e, 'numOfTravelers')}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select></label>
            <label className="maxpricelabelwrap">Max Price
              <input onChange={(e) => updateSearchParamsNum(e, 'maxPrice')} placeholder="Max Price?" type="number"></input>
            </label>
          </div>
        </span>
        </section>
        
        <section className="flightclasswrap">
            <label className="maxpricelabelwrap"> Cabin Class
          <select onChange={(e) => updateSearchParams(e, 'flightClass')} className="flightclassdropdown">
            <option value='ECONOMY'>Economy</option>
            <option value='BUSINESS'>Business</option>
            <option value='FIRST'>First</option>
          </select>
          </label>
        </section> 
          <button className="searchBtn" onClick={flightQuery}>
            Submit
          </button>
        </form>
    </div>
  );
}
export default FlightSearchModal;
