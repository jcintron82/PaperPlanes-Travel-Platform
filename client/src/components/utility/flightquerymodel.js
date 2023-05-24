import "../../css/flightresults.css";
import "../../css/utility/home.css";
import "../../css/utility/header.css";
import "../../css/utility/travelersmodal.css";
import adPicOne from "../../images/home/adone.jpg";
import * as React from 'react';
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BounceLoader from "react-spinners/BounceLoader";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Header } from "./header";
import { SafetyModal } from './safetymodal'
import { TravelersPopup } from "./numoftravalersmodal";
import { RefineSearchPopup } from "./refinsesearchmodal";
import { RecommendedTab } from "./recommendedtraveltabs";
import { travelerCounts } from "./numoftravalersmodal";
import { searchParams } from "./refinsesearchmodal";
import { Footer } from "./footer";
import nycphoto from "../../images/home/nyc.avif";
import londonphoto from "../../images/home/london.avif";
import miamiphoto from "../../images/home/miami.avif";
import sanfran from "../../images/home/sanfran.avif";
import tokyophoto from "../../images/home/tokyo.avif";
import parisphoto from "../../images/home/paris.avif";
import denverphoto from "../../images/home/denver.avif";
import hawaiiphoto from "../../images/home/hawaii.avif";
import kayakphoto from "../../images/home/kayak.avif";
import oceanphoto from "../../images/home/hiking.avif";
import backpackingphoto from "../../images/home/hammock.avif";
//--------------End of photo imports---------------//
export { FlightSearchModal, queryResponseObj };
const queryResponseObj = [];
const autocompleteAPIValuesHold = {};

function FlightSearchModal() {
  const [incorrectInfo, setINcorrectInfoModal] = useState(false);
  const [departureLocation, setDepartureLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [hotelOrFlight, sethotelOrFlight] = useState(true);
  const [roundTripSelected, setRoundTrip] = useState(false);
  const [oneWaySelected, setOneWay] = useState(false);
  const [queryRecieved, setQueryStatus] = useState();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [userMessage, setUserMessage] = useState(
    localStorage.getItem("username") ? "Username" : "Departing From..."
  );
  const { headerRef, headerInView } = useInView({
    threshold: 1,
    // rootMargin:
  });
  const [travelersPopup, setTravelersPopupdults] = useState(false);
  const [refineSearchPopup, setRefineSearchPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [arrivalMessage, setArrivalMessage] = useState(
    localStorage.getItem("username")
      ? "Where's your next adventure " + localStorage.getItem("username") + "?"
      : "Arriving at..."
  );
  const [autocompleteOne, setautocompleteOne] = useState("");
  const [autocompleteTwo, setautocompleteTwo] = useState("");
  const [autocompleteThree, setautocompleteThree] = useState("");

  const [autocompleteOneArrival, setautocompleteOneArrival] = useState("");
  const [autocompleteTwoArrival, setautocompleteTwoArrival] = useState("");
  const [autocompleteThreeArrival, setautocompleteThreeArrival] = useState("");
  const navigate = useNavigate();
  const breakpoint = 1024;
  const RecommendedTabsBreakpoint = 835;
  //The listings in this body aren't technically needed but they are there
  //for reference to easily know all the parameters being/which can be used
  const body = {
    departure: departureLocation,
    departureDate: "",
    arrival: arrivalLocation,
    maxPrice: 5000,
    flightClass: "ECONOMY",
    adults: 1,
    children: 0,
    nonStop: false,
  };
  const flightQuery = async (e) => {
    e.preventDefault();
    // setIsLoading(!isLoading);
    body.adults = travelerCounts.adults;
    body.children = travelerCounts.children;
    body.maxPrice = searchParams.maxPrice;
    body.nonStop = searchParams.nonstop;
    body.flightClass = searchParams.cabinClass;
    body.departure = body.departure.slice(-3);
    body.arrival = body.arrival.slice(-3);
    queryResponseObj.departure = departureLocation;
    queryResponseObj.arrival = arrivalLocation;
    if(body.departure === "" || body.arrival === "" || body.departure === "" || body.departureDate === ''){
      setINcorrectInfoModal(true)
      setOpen(true)
    }
    else {
      // if(width > 750){
      //   navigate('/loading')
      // }
      setIsLoading(true)
    try {
      const pull = await fetch("https://paperplanes-server.vercel.app/query", {
        method: "POST",
        headers: { "Content-Type": "application/json"
       },
        body: JSON.stringify(body),
      });
      const data = await pull.json();
      console.log(body);
      queryResponseObj.dates = body;
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setIsLoading(false);
        setErrorSnackbar(true);
      }, 2500);
     
    }
    const pull = await fetch("https://paperplanes-server.vercel.app/query");
    // const pull = await fetch("http://localhost:8000/query");
    const data = await pull.json();
    console.log(data);
    const finalIndex = (data.carriers.length -1)
    // data.carriers[0] = data.carriers[finalIndex]

    // setDepartureLocation(data.message.data);
    setQueryStatus(!queryRecieved);
    queryResponseObj[0] = data;
    queryResponseObj[0].filtered = [];
    let grandTotal = 0;
    const flightsByPrice = data.message.data.forEach((flight) => {
      if (flight.price.grandTotal === grandTotal){
        return;
      }
      else {
        queryResponseObj[0].filtered.push(flight);
        grandTotal = flight.price.grandTotal;
      }
    })
    queryResponseObj[1] = data;
    console.log( queryResponseObj[0] )
    navigate("/flightquery");
    callCitySearchAPI();
  }
    // return { message: queryResponseObj };
  };
  const setInputMessage = () => {
    setUserMessage(
      "Where's your next adventure " + localStorage.getItem("username") + "?"
    );
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
      autocompleteAPIValuesHold.options = data;
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

      setautocompleteOneArrival(
        data.data[0].address.cityName + ", " + data.data[0].iataCode
      );
      setautocompleteTwoArrival(
        data.data[1].address.cityName + ", " + data.data[1].iataCode
      );
      setautocompleteThreeArrival(
        data.data[2].address.cityName + ", " + data.data[2].iataCode
      );
    } catch (err) {}
  };
  const hotelFlightSwitch = () => {
    sethotelOrFlight(!hotelOrFlight);
  };
  const selectTripType = () => {
    setRoundTrip(true);
    setOneWay(false);
  };
  const selectTripTypeOneWay = () => {
    setRoundTrip(false);
    setOneWay(true);
  };
  const updateSearchParams = (e) => {
    callCitySearchAPI(e.target.value);
    setDepartureLocation(e.target.value);
  };
  const updateArrivalParams = (e) => {
    callCitySearchAPI(e.target.value);
    setArrivalLocation(e.target.value);
  };
  const updateDatesAndFilters = (e, valueToUpdate) => {
    body[valueToUpdate] = e.target.value;
  };
  useEffect(() => {
    if (headerInView) {
      console.log("Element is in view");
    } else {
      console.log("Element is not in view");
    }
    setArrivalMessage(
      localStorage.getItem("username")
        ? "Where's your next adventure " +
            localStorage.getItem("username") +
            "?"
        : "Arriving at..."
    );
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [headerInView,localStorage.getItem("username")]);

     //SnackBar logic

     const handleClick = () => {
       setOpen(false);
     };
     const handleClose = () => {
       setOpen(false);
     };
   
     const action = (
       <React.Fragment>
         <Button color="secondary" size="small" onClick={handleClose}>
           UNDO
         </Button>
         <IconButton
           size="small"
           aria-label="close"
           color="inherit"
           onClick={handleClose}
         >
           <CloseIcon fontSize="small" />
         </IconButton>
       </React.Fragment>
     );
  return (
    <div className="maindiv">
      <Snackbar 
             open={open}
             autoHideDuration={6000}
             onClose={handleClose}
             message="Please fill out all input fields."
             action={action}/>
              <Snackbar 
             open={errorSnackbar}
             autoHideDuration={6000}
             onClose={() => setErrorSnackbar(false)}
             message="There was an error, please select your date(s) again. "
             action={action}/> 
      <Header
       ref={headerRef}
        headerClass={headerInView ? "headercolored" : "headermainwrap"}
        link={"logolink"}
        planeSVG={"paperplanesvg"}
        profileSVG={"accountsvg"}
        // isColored={headerInView}
        message={() => setInputMessage()}
        renderLogoutState={(e) => {
          setArrivalMessage("Arriving at...");
        }}
      />{" "}
      {isLoading ? (
        <BounceLoader
          speedMultiplier={0.9}
          className="gridloader"
          color="#05203C"
          cssOverride={{
            position: "absolute",
          }}
          size={width > breakpoint ? 500 : 300}
        />
      ) : null}
      <div
        className={isLoading ? "mainsearchwrap pageopacity" : "mainsearchwrap"}
      >
        <form className="flightsearchform">
          <section className="flighttypebtnwrap">
            <button
              type="button"
              className={
                roundTripSelected
                  ? "triptypebtnselected triptypebtnround"
                  : "triptypebtnround"
              }
              onClick={selectTripType}
            >
              Round-Trip
              <svg
                className="flighttypesvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>chevron-down</title>
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </button>{" "}
            <button
              type="button"
              className={
                roundTripSelected
                  ? "triptypebtnone"
                  : "triptypebtnone triptypebtnselected"
              }
              onClick={selectTripTypeOneWay}
            >
              One-Way{" "}
              <svg
                className="flighttypesvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>chevron-down</title>
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </button>
        
          </section>

          <label className="locationinputswrap">
            <input
              autoComplete="off"
              list="locationslist"
              id="departure-location-complete"
              className="locationinputsarrival"
              required
              onChange={(e) => updateSearchParams(e, "departure")}
              placeholder="Los Angeles, LAX"
            ></input>

            <datalist id="locationslist">
              <option value={autocompleteOne}></option>
              <option value={autocompleteTwo}></option>
              <option value={autocompleteThree}></option>
            </datalist>
            <input
              autoComplete="off"
              list="arrivallist"
              id="arrival-location-complete"
              className="locationinputs"
              required
              onChange={(e) => updateArrivalParams(e, "arrival")}
              placeholder="San Francisco, SFO"
            ></input>
            <datalist id="arrivallist">
              <option value={autocompleteOneArrival}></option>
              <option value={autocompleteTwoArrival}></option>
              <option value={autocompleteThreeArrival}></option>
            </datalist>
          </label>
          <section className="addOnsWrap">
            <CSSTransition
              in={oneWaySelected}
              timeout={400}
              classNames="modals"
            >
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
                    className="depaturedateinput2"
                    required
                    onChange={(e) => updateDatesAndFilters(e, "departureDate")}
                    type="date"
                  ></input>
                </label>
              )}
            </CSSTransition>

            <div className="refinesearchwrap">
              <button
                type="button"
                onClick={(e) => {
                  setRefineSearchPopup(!refineSearchPopup);
                }}
                className="refinesearchbtn"
              >
                Refine Search
              </button>
              <button
                className="travelersbtn"
                onClick={(e) => {
                  setTravelersPopupdults(!travelersPopup);
                }}
                type="button"
              >
                <svg
                  className="personsvg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>account-group</title>
                  <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                </svg>
                {adultCount} Adult {childCount} Children
              </button>{" "}
              {refineSearchPopup ? (
                <CSSTransition
                  classNames="travelersnumpopup"
                  timeout={400}
                  in={refineSearchPopup}
                >
                  <RefineSearchPopup
                    className="travelersnumpopup"
                    close={(e) => {
                      setRefineSearchPopup(!refineSearchPopup);
                    }}
                  />
                </CSSTransition>
              ) : null}
              {travelersPopup ? (
                <TravelersPopup
                  numAdults={(e) => {
                    setAdultCount(travelerCounts.adults);
                  }}
                  numChildren={(e) => {
                    setChildCount(travelerCounts.children);
                  }}
                  close={(e) => {
                    setTravelersPopupdults(!travelersPopup);
                  }}
                />
              ) : null}
            </div>
          </section>
          <button type="button" className="searchBtn" onClick={(e) => flightQuery(e)}>
            Submit
          </button>
        </form>
      </div>
      <section className="otheritemswrap" >
        <div className={isLoading ? "adwraps pageopacity" : "adwraps"}>
          <div className="adslogans">
            <p className="adone" >
              Find Your <h1 className="paradiseh1">Paradise</h1>
              <a href="#" className="booknowlink">
              Book Now
            </a>
            </p>
           
          </div>
          <img src={adPicOne}></img>
        </div>
      </section>
      <section className="rectravelswrap">
        <article>
         {/* {width >= 1024 ? <SafetyModal /> : null} */}
          {width > RecommendedTabsBreakpoint ? (
            <ul className="recommendedtabswrap">
               <p>Popular destinations</p>
              <RecommendedTab img={nycphoto} cityName='New York'/>
              <RecommendedTab img={londonphoto} cityName='London'/>
              <RecommendedTab img={miamiphoto} cityName='Miami'/>
              <RecommendedTab img={sanfran} cityName='San Francisco'/>
              <RecommendedTab img={parisphoto} cityName='Paris'/>
              <RecommendedTab img={tokyophoto} cityName='Tokyo'/>
              <RecommendedTab img={hawaiiphoto} cityName='Honolulu'/>
              <RecommendedTab img={denverphoto} cityName='Denver'/>
            </ul>
          ) : (
            <ul className="recommendedtabswrap">
               <p>Popular destinations</p>
              <RecommendedTab img={nycphoto} cityName='New York' />
              <RecommendedTab img={londonphoto} cityName='London'/>
              <RecommendedTab img={miamiphoto} cityName={'Miami'}/>
              <RecommendedTab img={sanfran} cityName={'San Francisco'}/>
            </ul>
          )}
        </article>
        <div className="recimgwrap">
          <span className="imgspans"><img className="rectravimages" src={kayakphoto}></img><h1>Fun for everyone</h1><a>Find fun adventures for the whole family - furry and not</a></span>
          {width > RecommendedTabsBreakpoint ? (
            <span className="imgspans"><img className="rectravimages" src={backpackingphoto}></img><h1>Rest and Recoup</h1><a>Take a vacation and recharge those batteries - you deserve it</a></span>
          ) : (
            <ul className="recommendedtabswrap">
              <RecommendedTab img={parisphoto} cityName={'Paris'} />
              <RecommendedTab img={tokyophoto} cityName={'Tokyo'}/>
              <RecommendedTab img={hawaiiphoto} cityName={'Honolulu'}/>
              <RecommendedTab img={denverphoto} cityName={'Denver'}/>
            </ul>
          )}
          {/* <h1 className="recfadetext" ref={ref}>
            {InView ? (
              <div className={inView ? "herotext" : "herotext"}>
              </div>
            ) : null}
          </h1> */}
          
         <span className="imgspans"><img className="rectravimageslast" src={oceanphoto}></img><h1>Find your Adeventure</h1><a>Book your travel adventures now</a></span>
        </div>
      </section>
      <span className="passangerselectwrap">
        <div className="maxpricewrap"></div>
      </span>
      <section className="prefootercta">
        <h1>Explore the world of possibilties</h1>
        <a>Discover new places and experiences</a>
      </section>
      <Footer> </Footer>
    </div>
  );
}
export default FlightSearchModal;