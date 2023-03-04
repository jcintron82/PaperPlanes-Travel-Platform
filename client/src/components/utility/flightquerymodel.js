import "../../css/flightresults.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export { FlightSearchModal, queryResponseObj };
const queryResponseObj = [];

function FlightSearchModal() {
  const [departureLocation, setDepartureLocation] = useState([]);
  const [oneWay, setOneWay] = useState(true);

  const [queryRecieved, setQueryStatus] = useState(false);
  const navigate = useNavigate();

  const body = {
    departure: '',
    arrival: '',
  }
  const flightQuery = async (e) => {
    e.preventDefault();
    try {
      const pull = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await pull.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    const pull = await fetch("http://localhost:8000/query");
    const data = await pull.json();
    // setDepartureLocation(data.message.data);
    setQueryStatus(!queryRecieved);
    setQueryStatus(!queryRecieved);
    queryResponseObj[0] = data;
    console.log(queryResponseObj);
    navigate("/flightquery");
    return { message: queryResponseObj };
  };
  const tripTypeSelector = () => {
    setOneWay(!oneWay);
  };
  const recordDepartureLoc = (e) => {
    console.log('Departure Value -  ' + e.target.value)
    body.departure = e.target.value;

  }
  const recordArrivalLoc = (e) => {
    console.log('Arrival Value -  ' + e.target.value);
    body.arrival = e.target.value;
  }
  return (
    <div className="App">
      {oneWay ? (
        <form>
          <button onClick={tripTypeSelector}>Round-Trip</button>
          <label>
            <input onChange={(e) => recordDepartureLoc(e)} placeholder="Departing From..."></input>
          </label>
          <label>
            <input onChange={(e) => recordArrivalLoc(e)} placeholder="Arriving To..."></input>
          </label>
          <button onClick={flightQuery}>Submit</button>
        </form>
      ) : (
        <div>
          <button onClick={tripTypeSelector}>One-Way</button>
          <label>
            <input onChange={(e) => recordDepartureLoc(e)} placeholder="Departing From..."></input>
          </label>
          <label>
            <input onChange={(e) => recordArrivalLoc(e)} placeholder="Arriving To..."></input>
          </label>
          <button onClick={flightQuery}>Submit</button>
        </div>
      )}
    </div>
  );
}
export default FlightSearchModal;
