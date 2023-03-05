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
    numOftravelers: 1,
    returnDate: "",
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
  const recordDepartureLoc = (e) => {
    body.departure = e.target.value;
  };
  const recordDepartureDate = (e) => {
    body.departureDate = e.target.value;
  };
  const recordReturnDate = (e) => {
    body.returnDate = e.target.value;
  };
  const recordArrivalLoc = (e) => {
    console.log("Arrival Value -  " + e.target.value);
    body.arrival = e.target.value;
  };
  const recordNumOfTravelers = (e) => {
    body.numOftravelers = e.target.value;
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
              onChange={(e) => recordDepartureLoc(e)}
              placeholder="Departing From..."
            ></input>
            <input
              className="locationinputs"
              required
              onChange={(e) => recordArrivalLoc(e)}
              placeholder="Arriving To..."
            ></input>
          </label>
          {roundTripSelected ? (
            <label className="dateselectionwrap">
              <input
                required
                onChange={(e) => recordDepartureDate(e)}
                type="date"
              ></input>
              <input
                required
                onChange={(e) => recordReturnDate(e)}
                type="date"
              ></input>
            </label>
          ) : (
            <label className="dateselectionwrap">
              <input
                required
                onChange={(e) => recordDepartureDate(e)}
                type="date"
              ></input>
            </label>
          )}
          <section className="extrafilterswrap">
            <span className="passangerselectwrap">
              Number of Passengers
              <div className="maxpricewrap">
                <select required onChange={(e) => recordNumOfTravelers(e)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <label>
                  <input placeholder="Max Price?" type="number"></input>
                </label>
              </div>
            </span>
            <section className="flightclasswrap">
              <select className="flightclassdropdown">
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </section>
          </section>
          <button className="searchBtn" onClick={flightQuery}>
            Submit
          </button>
        </form>
    </div>
  );
}
export default FlightSearchModal;
