import { queryResponseObj } from "./flightquerymodel";
import { travelerCounts } from "./numoftravalersmodal";
import { searchParams } from "./refinsesearchmodal";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export const FlightsSearchBar = ({ setSearchState }) => {
    const departureRef = useRef('');
    const arrivalRef = useRef('');
    const retRef = useRef('');
    const depRef = useRef(queryResponseObj[0].message.data[0] ? new Date(queryResponseObj[0].message.data[0].itineraries[0].segments[0].departure.at) : 'N/A');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [autocompleteOne, setautocompleteOne] = useState();
    const [autocompleteTwo, setautocompleteTwo] = useState();
    const [autocompleteThree, setautocompleteThree] = useState();
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
      const updateSearchParams = (e) => {
        callCitySearchAPI(e.target.value);
        setDeparture(e.target.value);
      };
      const updateArrivalParams = (e) => {
        callCitySearchAPI(e.target.value);
        setArrival(e.target.value);

      };
    const flightQuery = async (e) => {
      queryResponseObj.arrival = arrival;
      queryResponseObj.departure = departure;
        navigate('/loading');
        setIsLoading(!isLoading);
        body.adults = travelerCounts.adults;
        body.children = travelerCounts.children;
        body.maxPrice = searchParams.maxPrice;
        body.nonStop = searchParams.nonstop;
        body.flightClass = searchParams.cabinClass;
        body.departure = departure.slice(-3);
        body.departureDate = departureDate
        body.arrival = arrival.slice(-3);
    
        try {
          const pull = await fetch("https://paperplanes-server.vercel.app/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const data = await pull.json();
        } catch (err) {
          console.log(err);
        }
        const pull = await fetch("https://paperplanes-server.vercel.app/query");
        const data = await pull.json();
        queryResponseObj.dates = body;
        // setDepartureLocation(data.message.data);
        setQueryStatus(!queryRecieved);
        queryResponseObj.filtered = data;
        setSearchState()
        console.log(data)
        navigate("/flightquery");
        // updateState();
        console.log(queryResponseObj)
      };
      const callCitySearchAPI = async (input) => {
        let token = "";
        const fetchAuth = await fetch(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          {
            body:
              "grant_type=client_credentials&client_id=" +
              process.env.REACT_APP_CLIENT_ID +
              "&client_secret=" +
              process.env.REACT_APP_CLIENT_SECRET,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
          }
        );
    
        const data = await fetchAuth.json();
        token = data.token_type + " " + data.access_token;
    
        try {
          const pull = await fetch(
            "https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=" +
              input +
              "&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL",
            {
              headers: {
                Accept: "application/vnd.amadeus+json",
                Authorization: token,
              },
            }
          );
          const data = await pull.json();
          // console.log(data);
          // autocompleteAPIValuesHold.options = data;
          // console.log(data);
    
          setautocompleteOne(
            data.data[0].address.cityName + ", " + data.data[0].iataCode
          );
          setautocompleteTwo(
            data.data[1].address.cityName + ", " + data.data[1].iataCode
          );
          setautocompleteThree(
            data.data[2].address.cityName + ", " + data.data[2].iataCode
          );
        } catch (err) {
          console.log(err)
        }
      };
    const navigate = useNavigate();
return (
    <article className="flightmetainfowrap">
    <p>
      {queryResponseObj.departure.slice(0,-5)} to{" "}
      {queryResponseObj.arrival.slice(0,-5)}
      <br></br> 
      {new Date(queryResponseObj.dates.departureDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
    {queryResponseObj.dates.returnDate ?" - " + new Date(queryResponseObj.dates.returnDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null }
    </p>
    <form className="metainfoform">
      <label>
        <input
         onChange={(e) => updateSearchParams(e, "departure")}
          ref={departureRef}
          type="text"
          list="locationslist"
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
        <datalist id="locationslist">
              <option value={autocompleteOne}></option>
              <option value={autocompleteTwo}></option>
              <option value={autocompleteThree}></option>
            </datalist>
      </label>
      <label>
        <input
        list="arrivalslist"
          onChange={(e) => updateArrivalParams(e, "arrival")}
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
        <datalist id="arrivalslist">
              <option value={autocompleteOne}></option>
              <option value={autocompleteTwo}></option>
              <option value={autocompleteThree}></option>
            </datalist>
      </label>
      <label>
        <input
        ref={depRef}
        onChange={(e) => setDepartureDate(e.target.value)}
        type="date"
        placeholder={new Date().toLocaleDateString()}></input>
      </label>
      <label>
        <input
        ref={retRef}
          onChange={(e) => updateDatesAndFilters(e, "returnDate")}
        type="date"></input>
      </label>
      <button onClick={() => {
        flightQuery();
        // updateState();
    }
    }>Search</button>
    </form>
  </article>
)
}

export default FlightsSearchBar;
