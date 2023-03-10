import "../../css/flightresults.css";
import "../../css/utility/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from './header';

export { FlightSearchModal, queryResponseObj };
const queryResponseObj = [];
const autocompleteAPIValuesHold = {};
function FlightSearchModal() {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [oneWay, setOneWay] = useState(true);
  const [roundTripSelected, setRoundTrip] = useState(true);

  const [queryRecieved, setQueryStatus] = useState();

  const [autocompleteOne, setautocompleteOne] = useState('');
  const [autocompleteTwo, setautocompleteTwo] = useState('');
  const [autocompleteThree, setautocompleteThree] = useState('');

  const [autocompleteOneArrival, setautocompleteOneArrival] = useState('');
  const [autocompleteTwoArrival, setautocompleteTwoArrival] = useState('');
  const [autocompleteThreeArrival, setautocompleteThreeArrival] = useState('');


  const [autocompleteTwoValue, setautocompleteTwoValue] = useState('');
  const [autocompleteThreeValue, setautocompleteThreeValue] = useState('');
  const navigate = useNavigate();

  const body = {
    departure: departureLocation,
    departureDate: "",
    arrival: arrivalLocation,
    numOfTravelers: 1,
    returnDate: "",
    maxPrice: 5000,
    flightClass: "ECONOMY",
  };
  const flightQuery = async (e) => {
    e.preventDefault();
    body.departure = body.departure.slice(-3)
    body.arrival = body.arrival.slice(-3)
    console.log(body)
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
    callCitySearchAPI()
    console.log(process.env.REACT_APP_CLIENT_ID)
    return { message: queryResponseObj };
  };

  const callCitySearchAPI = async (input) => {
    let token = '';
    const fetchAuth = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      body: "grant_type=client_credentials&client_id=" + process.env.REACT_APP_CLIENT_ID+ "&client_secret=" + process.env.REACT_APP_CLIENT_SECRET,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      });
 
      const data = await fetchAuth.json()
      token = data.token_type +' '+ data.access_token

    try {
      const pull = await fetch("https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword="+input+"&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL", {
        headers: {
          Accept: "application/vnd.amadeus+json",
          Authorization:token
        }
      });
      const data = await pull.json();
      // console.log(data);
      autocompleteAPIValuesHold.options = data;
      console.log(data)


      setautocompleteOne(data.data[0].address.cityName + ', ' +
      data.data[0].iataCode)
      setautocompleteTwo(data.data[1].address.cityName + ', ' +
      data.data[1].iataCode);
      setautocompleteThree(data.data[2].address.cityName + ', ' +
      data.data[2].iataCode);

      setautocompleteOneArrival(data.data[0].address.cityName + ', ' +
      data.data[0].iataCode)
      setautocompleteTwoArrival(data.data[1].address.cityName + ', ' +
      data.data[1].iataCode);
      setautocompleteThreeArrival(data.data[2].address.cityName + ', ' +
      data.data[2].iataCode);

      // data.data[1].address.stateCode
      // setautocompleteTwoValue(data.data[1].iataCode);
      // setautocompleteThreeValue(data.data[2].iataCode);


      console.log(data.address.cityName)
    } catch (err) {
      // console.log(err);
    }
  }
  const selectTripType = (value) => {
    setRoundTrip(!roundTripSelected);
  };
  const updateSearchParams = (e) => {
    callCitySearchAPI(e.target.value);
    setDepartureLocation(e.target.value)
  };
  const updateArrivalParams = (e) => {
    callCitySearchAPI(e.target.value);
    setArrivalLocation(e.target.value)
  };
  const updateDatesAndFilters = (e, valueToUpdate) => {
    body[valueToUpdate] = e.target.value;
  };
  const updateSearchParamsNum = (e, valueToUpdate) => {
    body[valueToUpdate] = parseInt(e.target.value);
  };
  return (
    <div className="mainsearchwrap">
      <Header />
      {" "}
      <form className="flightsearchform">
        <section className="flighttypebtnwrap">
          {roundTripSelected ?  <button className="triptypebtns" type="button" onClick={selectTripType}>
          One-Way
          </button> : <button className="triptypebtns" type="button" onClick={selectTripType}>
            Round-Trip
          </button>}
         
        </section>
        <label className="locationinputswrap">
          <input
            autoComplete="off"
            list="locationslist"
            id="departure-location-complete"
            className="locationinputsarrival"
            required
            onChange={(e) => updateSearchParams(e, "departure")}
            placeholder="Departing From..."
          ></input>
          <datalist id="locationslist">
              <option onClick={() => console.log('YO')}  value={autocompleteOne}></option>
              <option  value={autocompleteTwo}></option>
              <option  value={autocompleteThree}></option>
              {/* <option value="Strawberry"></option>
              <option value="Vanilla"></option> */}
              </datalist>
        <input
            autoComplete="off"
            list="arrivallist"
            id="arrival-location-complete"
            className="locationinputs"
            required
            onChange={(e) => updateArrivalParams(e, "arrival")}
            placeholder="Arriving To..."
          ></input>
          <datalist id="arrivallist">
          <option onClick={() => console.log('YO')}  value={autocompleteOneArrival}></option>
              <option  value={autocompleteTwoArrival}></option>
              <option  value={autocompleteThreeArrival}></option>
              {/* <option value="Strawberry"></option>
              <option value="Vanilla"></option> */}
              </datalist>
        </label>
        <section className="addOnsWrap">
          {roundTripSelected ? (
            <div className="dateselectionwrap">
              <input
                className="depaturedateinput"
                required
                onChange={(e) => updateDatesAndFilters(e, "departureDate")}
                type="date"
              ></input>
              <input
                className="arrivaldateinput"
                required
                onChange={(e) => updateDatesAndFilters(e, "returnDate")}
                type="date"
              ></input>
            </div>
          ) : (
            <label className="dateselectionwrap">
              <input
                required
                onChange={(e) => updateDatesAndFilters(e, "departureDate")}
                type="date"
              ></input>
            </label>
          )}
          <span className="passangerselectwrap">
            <div className="maxpricewrap">
              <button className="refinesearchbtn">Refine Search</button>
              <section className="personsvgandinputwrap">
              <h1 className="svgparent"><svg className="personsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-group</title><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" /></svg></h1>
              <div className="personswrap">
              <label className="maxpricelabelwrap">
                Adults
                <select
                  required
                  onChange={(e) => updateSearchParamsNum(e, "numOfTravelers")}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
              <label className="maxpricelabelwrap">
                Children
                <select
                  required
                  onChange={(e) => updateSearchParamsNum(e, "numOfTravelers")}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
              </div>
              </section>
              {/* <label className="maxpricelabelwrap">
                Max Price
                <input
                  onChange={(e) => updateSearchParamsNum(e, "maxPrice")}
                  placeholder="Max Price?"
                  type="number"
                ></input>
              </label> */}
            </div>
          </span>
        </section>

        {/* <section className="flightclasswrap">
          <label className="maxpricelabelwrap">
            {" "}
            Cabin Class
            <select
              onChange={(e) => updateDatesAndFilters(e, "flightClass")}
              className="flightclassdropdown"
            >
              <option value="ECONOMY">Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </label>
        </section> */}
        <button className="searchBtn" onClick={flightQuery}>
          Submit
        </button>
      </form>
    <section className="otheritemswrap">
      
      <button>Hotels</button>
      <button>Explore</button>
    </section>
    </div>
  );
}
export default FlightSearchModal;
