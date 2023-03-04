import "../../css/flightresults.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export { FlightSearchModal, queryResponseObj }
const queryResponseObj = [];

function FlightSearchModal() {
  const [departureLocation, setDepartureLocation] = useState([]);
  const [oneWay, setOneWay] = useState(true);

  const [queryRecieved, setQueryStatus] = useState(false);
  const navigate = useNavigate();

  const flightQuery = async (e) => {
    console.log('f')
    e.preventDefault()
    const pull = await fetch("http://localhost:8000/query");
    const data = await pull.json();
    console.log(data)
    // setDepartureLocation(data.message.data);
    setQueryStatus(!queryRecieved);
    // responseArr.push(data.message.data);
    // console.log(departureLocation);
    setQueryStatus(!queryRecieved);
    queryResponseObj[0] = data;
    console.log(queryResponseObj)
    navigate('/flightquery')
    return ({message:queryResponseObj })
  };
  const tripTypeSelector = () => {
    setOneWay(!oneWay);
  }

  return (
    <div className="App">
      {oneWay ? (
        <form>
        <button onClick={tripTypeSelector}>Round-Trip</button>
        <label>
          <input placeholder="Flying To"></input>
        </label><button onClick={flightQuery}>Round-Trip</button>
        </form>
      ) : (
        <div>
          <button onClick={tripTypeSelector}>One-Way</button>
          <label>
            <input placeholder="Flying To"></input>
          </label>
          <label>
            <input placeholder="Flying To"></input>
          </label><button onClick={flightQuery}>Round-Trip</button>
        </div>
      )}
    </div>
  );
}
export default FlightSearchModal;
