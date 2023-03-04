import "../../css/flightresults.css";
import "../../css/utility/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export { FlightSearchModal, queryResponseObj };
const queryResponseObj = [];

function FlightSearchModal() {
  const [departureLocation, setDepartureLocation] = useState([]);
  const [oneWay, setOneWay] = useState(true);

  const [queryRecieved, setQueryStatus] = useState();
  const navigate = useNavigate();

  const body = {
    departure: "",
    departureDate: "",
    arrival: "",
    numOftravelers: 1,
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
  const tripTypeSelector = () => {
    setOneWay(!oneWay);
  };
  const recordDepartureLoc = (e) => {
    body.departure = e.target.value;
  };
  const recordDepartureDate = (e) => {
    body.departureDate = e.target.value;
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
      {oneWay ? (
        <form className="flightsearchform">
          <button type="button" onClick={tripTypeSelector}>
            Round-Trip
          </button>
          <label>
            <input
              required
              onChange={(e) => recordDepartureLoc(e)}
              placeholder="Departing From..."
            ></input>
          </label>
          <label>
            <input
              required
              onChange={(e) => recordArrivalLoc(e)}
              placeholder="Arriving To..."
            ></input>
            <label>
              <input
                required
                onChange={(e) => recordDepartureDate(e)}
                type="date"
              ></input>
            </label>
            <label>
              <select required onChange={(e) => recordNumOfTravelers(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
          </label>
          <button onClick={flightQuery}>Submit</button>
        </form>
      ) : (
        <form>
          <button type="button" onClick={tripTypeSelector}>
            One-Way
          </button>
          <label>
            <input
              onChange={(e) => recordDepartureLoc(e)}
              placeholder="Departing From..."
            ></input>
          </label>
          <label>
            <input
              onChange={(e) => recordArrivalLoc(e)}
              placeholder="Arriving To..."
            ></input>
            <input type="date"></input>
            <input type="date"></input>
          </label>
          <button onClick={flightQuery}>Submit</button>
        </form>
      )}
    </div>
  );
}
export default FlightSearchModal;
