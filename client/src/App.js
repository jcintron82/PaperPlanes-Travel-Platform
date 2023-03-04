import "./css/flightresults.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlightSearchModal } from "./components/utility/flightquerymodel";

export { App, queryResponseObj}
const queryResponseObj = {};
function App() {
  const [departureLocation, setDepartureLocation] = useState([]);
  const [oneWay, setOneWay] = useState(true);

  const [queryRecieved, setQueryStatus] = useState(false);
  const navigate = useNavigate();

  const flightQuery = async () => {
    navigate('/flightquery')
    console.log('d')
    const pull = await fetch("http://localhost:8000/query");
    const data = await pull.json();
    // setDepartureLocation(data.message.data);
    setQueryStatus(!queryRecieved);
    // responseArr.push(data.message.data);
    // console.log(departureLocation);
    setQueryStatus(!queryRecieved);
    queryResponseObj.queryRes = data;
  };
  const tripTypeSelector = () => {
    setOneWay(!oneWay);
  }

  return (
    <FlightSearchModal />
  );
}
export default App;
