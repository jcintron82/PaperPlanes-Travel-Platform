import { queryResponseObj } from "./flightquerymodel";
import { travelerCounts } from "./numoftravalersmodal";
import { searchParams } from "./refinsesearchmodal";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export const FlightsSearchBar = ({ updateState }) => {
    const departureRef = useRef('');
    const arrivalRef = useRef('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [departure, setDeparture] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [queryRecieved, setQueryStatus] = useState();
    const body = {
        departure: departureRef.current,
        departureDate: "",
        arrival: arrivalRef.current.value,
        maxPrice: 5000,
        flightClass: "ECONOMY",
        adults: 2,
        children: 0,
        nonStop: false,
      };
      const updateDatesAndFilters = (e, valueToUpdate) => {
        body[valueToUpdate] = e.target.value;
      };
    const flightQuery = async (e) => {
      console.log(departureRef.current.value)
      console.log(arrivalRef.current.value)
        navigate('/loading');
        setIsLoading(!isLoading);
        body.adults = travelerCounts.adults;
        body.children = travelerCounts.children;
        body.maxPrice = searchParams.maxPrice;
        body.nonStop = searchParams.nonstop;
        body.flightClass = searchParams.cabinClass;
        body.departure = departure;
        body.departureDate = departureDate
        body.arrival = arrival;
        console.log(body);
    
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
        console.log(data);
        // setDepartureLocation(data.message.data);
        setQueryStatus(!queryRecieved);
        queryResponseObj[0] = data;
        queryResponseObj[1] = data;
        navigate("/flightquery");
        // callCitySearchAPI();
        // return { message: queryResponseObj };
      };
    const convertedIataLocations = Object.values(
        queryResponseObj[1].carriers[0].locations
      );
    const navigate = useNavigate();
return (
    <article className="flightmetainfowrap">
    <p>
      {queryResponseObj.departure.slice(0,-5)} to{" "}
      {queryResponseObj.arrival.slice(0,-5)}
      <br></br> Apr 29 - Apr 30
    </p>
    <form className="metainfoform">
      <label>
        <input
         onChange={(e) => setDeparture(e.target.value)}
          ref={departureRef}
          type="text"
          placeholder="Flying From"
          aria-label="Flying From"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <title>airplane</title>
          <path d="M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z" />
        </svg>
      </label>
      <label>
        <input
          onChange={(e) => setArrival(e.target.value)}
          type="text"
          placeholder="Flying To"
          aria-label="Flying To"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <title>airplane</title>
          <path d="M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z" />
        </svg>
      </label>
      <label>
        <input
        onChange={(e) => setDepartureDate(e.target.value)}
        type="date"></input>
      </label>
      <label>
        <input
          onChange={(e) => updateDatesAndFilters(e, "returnDate")}
        type="date"></input>
      </label>
      <button onClick={() => {
        flightQuery();
        updateState();
    }
    }>Search</button>
    </form>
  </article>
)
}

export default FlightsSearchBar;
