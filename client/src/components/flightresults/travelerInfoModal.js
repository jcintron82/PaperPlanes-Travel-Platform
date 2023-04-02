import { useState, useEffect } from "react";
import { queryResponseObj } from "../utility/flightquerymodel";
import BounceLoader from "react-spinners/BounceLoader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../css/flightresults/detailsmodal.css";
import "../../css/flightresults/travelersinfomodal.css";
export function TravelerInfoModal({ openModal, btnClick }) {
  const [autocompleteOne, setAutoCompleteOne] = useState("test");
  const [countrySearchPopUp, setCountrySearchPopUp] = useState(false);
  const [emailScreen, setEmailScreen] = useState(false);
  const [addressScreen, setAddressScreen] = useState(false);
  const [travelerCount, setTravlerCount] = useState(true);
  const [travelerInfoscren, setTravelerInfoScreen] = useState(false);
  const [documentsScreen, setDocumentsScreen] = useState(false);
  const [confirmationScreen, setConfirmationScreen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [buyOffer, setBuyOffer] = useState(false);
  const [ccc, setCCc] = useState(true);
  const [confirmationScreenData, setConfirmationScreenData] = useState([]);
  const [travelerAddressPlaceholder, setTravelerAddressPlaceholder] =
    useState("");
  const [travelersArr, setTravelersArr] = useState([]);
  const [travelerId, setTravelerId] = useState(0);
  const [travelersInfo, setTravelerInfo] = useState({
    contact: {
      emailAddress: "johndoe@example.com",
      phones: [
        { deviceType: "MOBILE", countryCallingCode: "1", number: "5555555555" },
      ],
    },
  });
  const passportInfo = [];
  const personalInfo = [];
  const loopedObject = travelersArr.length < 1 ? null : Object.entries(travelersArr[travelersArr.length - 1]);
  const formatDate = (value) => {
    const parts = value.split('-');
    const date = new Date(parts[1] +'-'+parts[2]+'-'+parts[0]);
    const options = { month:'long', day:'numeric', year:'numeric', time:'none'};
    // return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const stateCodes = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UM",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  const confirmTravNum = async (e) => {
    e.preventDefault();
    const id = travelersArr.length + 1;
    const newObj = {
      id: id.toString(),
      dateOfBirth: "",
      name: {
        firstName: "",
        lastName: "",
        title: "",
        middleName: "",
        suffix: "",
      },
      gender: "",
      contact: {
        emailAddress: travelersArr[0]
          ? travelersArr[0].contact.emailAddress
          : "",
        phones: [
          {
            deviceType: "MOBILE",
            countryCallingCode: "1",
            number: travelersArr[0]
              ? travelersArr[0].contact.phones[0].number
              : "",
          },
        ],
        address: {
          lines: [""],
          postalCode: "",
          cityName: "",
          countryCode: "",
          stateCode: "",
        },
      },
      documents: [
        {
          documentType: "",
          birthPlace: "",
          issuanceCountry: "",
          expiryDate: "",
          number: "",
          holder: true,
          nationality: "",
        },
      ],
    };
    console.dir(newObj);
    travelersArr.push(newObj);

    setTravlerCount(false);
    if (travelersArr.length > 1) {
      setEmailScreen(false);
      setTravelerInfoScreen(true);
    } else {
      setEmailScreen(true);
    }
  };
  //Changes the ORDER email and contact number, changing it
  //on the obj template so all descendents have mathching values
  const recordOrderEmail = (e, value) => {
    travelersInfo.contact.emailAddress = e.target.value.toLowerCase();
    travelersArr[travelerId].contact.emailAddress =
      e.target.value.toLowerCase();
  };
  const recordOrderNum = (e, value) => {
    travelersInfo.contact.phones[0].number = e.target.value;
    travelersArr[travelerId].contact.phones[0].number = e.target.value;
  };
  const recordTravelerInfo = (e, key, nestedkey) => {
    const index = travelersArr.length - 1;
    const capitalizedWords = capitalizeWords(e.target.value);
    nestedkey === null
      ? (travelersArr[index][key] = capitalizedWords)
      : (travelersArr[index][key][nestedkey] = capitalizedWords);
    // travelersArr[travelerId].firstName = e.target.value
  };
  const recordTravelerAddress = (e, key) => {
    const index = travelersArr.length - 1;
    const capitalizedWords = capitalizeWords(e.target.value);
    if(key === 'countryCode'){
      travelersArr[index].contact.address.countryCode = e.target.value.toUpperCase();
    }
    else {
      key === 'lines' ? travelersArr[index].contact.address.lines[0] = capitalizedWords :
      travelersArr[travelerId].contact.address[key] = capitalizedWords;
    }
  };
  const recordDocumentData = (e, key, travelerId) => {
    const index = travelersArr.length - 1;
    const capitalizedWords = capitalizeWords(e.target.value);
    if (e.target.value === "null") {
      setCountrySearchPopUp(true);
    }
    if (key === "nationality" || key === "issuanceCountry") {
      travelersArr[index].documents[0][key] = e.target.value.toUpperCase();
      console.dir(travelersArr[0]);
      setConfirmationScreenData(travelersArr[travelerId]);
    } else {
      travelersArr[index].documents[0][key] = capitalizedWords;
      console.dir(travelersArr[0]);
      setConfirmationScreenData(travelersArr[travelerId]);
    }
    console.dir(travelersArr);
  };
  const updateSearchParams = (e) => {
    locationSearch(e.target.value);
  };
  const capitalizeWords = (str) => {
    return str
      .split(/[, ]+/)
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  const confirmFlightOffer = async () => {
    setBuyOffer(true)
    //Converting the converted carrier code back to its airline code for
    //search purposes
    // queryResponseObj[1].message.data[1].itineraries[0].segments[0].carrierCode = 
    // queryResponseObj[1].message.data[1].itineraries[0].segments[0].operating.carrierCode;
    // queryResponseObj[1].message.data[1].itineraries[1].segments[0].carrierCode = 
    // queryResponseObj[1].message.data[1].itineraries[1].segments[0].operating.carrierCode;
      const pull = await fetch("http://localhost:8000/flightconfirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([queryResponseObj[1].message.data[3], travelersArr])
      });
      const x = await pull.json()
      console.log(pull)
      console.log(x)
      setBuyOffer(false)
  }
  const locationSearch = async (input) => {
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
      const x = await pull.json();
      setAutoCompleteOne(x.data[0].address.countryName);
    } catch (err) {
      console.log(err);
    }
  };
  const finalTravelerNumber =
    queryResponseObj[0].travelerCounts.adults +
    queryResponseObj[0].travelerCounts.children;
    const breakpoint = 1024;
  return (
   
    <form className={openModal === true ? "travelersinfomodal" : "hide"}>
      {/* <h1 className="formheader"><h2>{travelerId + 1 }</h2></h1> */}
      { buyOffer ? 
       <BounceLoader
          speedMultiplier={0.9}
          className="gridloader"
          color="#05203C"
          cssOverride={{
            position: "absolute",
          }}
          size={width > breakpoint ? 500 : 300}
        /> : null
        }
      {travelerCount ? (
        <section className="mainsectionwrap">
          <h1 className="travelerNumWrap">
            Traveler {travelersArr.length === 0 ? 1 : travelersArr.length + 1} of {finalTravelerNumber}
            <br></br>
            To change the order traveler count, please create a new search.{" "}
          </h1> <CSSTransition
      in={travelerCount} timeout={3000} classNames='travelersinfomodal'
      >
          <svg
            fill="#5BC0BE"
            height="35vh"
            stroke="#05203C"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            ></path>
          </svg></CSSTransition>
          <br></br>
          <button className="nextbtn" type="button" onClick={confirmTravNum}>
            Confirm Traveler{" "}
          </button>
        </section>
      ) : null}
      {emailScreen ? (
        <article className="infowrap">
          <label>
            Email for Order
            <input
              onChange={(e) => recordOrderEmail(e, "emailAddress")}
              type="email"
              placeholder="example@email.com"
            ></input>
          </label>
          <label>
            Phone Number for Order
            <input
              onChange={(e) => recordOrderNum(e, "number")}
              type="tel"
              maxLength="12"
              placeholder="610-555-8282"
            ></input>
          </label>
          <button
            className="nextbtn"
            onClick={(e) => {
              setEmailScreen(false);
              setTravelerInfoScreen(true);
            }}
          >
            Next
          </button>
        </article>
      ) : null}
      {travelerInfoscren ? (
        <div>{console.log(travelersArr)}
          <label>Traveler {travelersArr.length}</label>
          <article className="infowrappeople">
            <label>
              Title
              <select
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "title", travelerId)
                }
              >
                <option value=""></option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </select>
            </label>
            <label>
              First Name
              <input
              required
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "firstName", travelerId)
                }
              ></input>
            </label>
            <label>
              Middle Name
              <input
              
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "middleName", travelerId)
                }
              ></input>
            </label>
            <label>
              Last Name
              <input
              required
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "lastName", travelerId)
                }
              ></input>
            </label>
            <label>
              Suffix
              <select
              
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "suffix", travelerId)
                }
              >
                <option value=""></option>
                <option value="Sr">Sr.</option>
                <option value="Jr">Jr</option>
                <option value="iii">III</option>
              </select>
            </label>
            <label>
              Date of Birth
              <input
              required
                type="date"
                onChange={(e) =>
                  recordTravelerInfo(e, "dateOfBirth", null, travelerId)
                }
              ></input>
            </label>
            <label>
              Gender
              <select
              required
                onChange={(e) =>
                  recordTravelerInfo(e, "gender", null, travelerId)
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label onClick={() => setAddressScreen(true)}>
              Street Address
              <input
              required
                type="text"
                placeholder={travelerAddressPlaceholder}
                onFocus={() => setAddressScreen(true)}
              ></input>
            </label>
            {/* <CSSTransition
              in={addressScreen}
              timeout={400}
              classNames="addressscreen"
            > */}
            {addressScreen ? (
              <div className="addressscreen">
                <label>
                  Street Address
                  <input
                  required
                    onChange={(e) =>
                      recordTravelerAddress(e, "lines", travelerId)
                    }
                  ></input>
                </label>
                <label>
                  City
                  <input
                  required
                    onChange={(e) =>
                      recordTravelerAddress(e, "cityName", travelerId)
                    }
                  ></input>
                </label>
                <label>
                  State
                  <select
                  required
                    onChange={(e) =>
                      recordTravelerAddress(e, "stateCode", travelerId)
                    }
                  >
                    <option value=""></option>
                    {stateCodes.map((value, index) => {
                      return (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      );
                    })}
                    ;
                  </select>
                </label>
                <label>
                  Country
                  <input
                  required
                    onChange={(e) =>
                      recordTravelerAddress(e, "countryCode", travelerId)
                    }
                  ></input>
                </label>
                <label>
                  Zip Code
                  <input
                  required
                    onChange={(e) =>
                      recordTravelerAddress(e, "postalCode", travelerId)
                    }
                  ></input>
                </label>
                <button
                className="nextbtn"
                  type="button"
                  onClick={(e) => {
                    setAddressScreen(false);
                    setTravelerAddressPlaceholder(
                      travelersArr[travelersArr.length - 1].contact.address.lines +
                        ", " +
                        travelersArr[travelersArr.length - 1].contact.address.cityName +
                        ", " +
                        travelersArr[travelersArr.length - 1].contact.address.stateCode +
                        ", " +
                        travelersArr[travelersArr.length - 1].contact.address.countryCode +
                        " " +
                        travelersArr[travelersArr.length - 1].contact.address.postalCode
                    );
                  }}
                >
                  Confirm
                </button>
              </div>
            ) : null}
            <button
              type="button"
              className="pplscreenbtn"
              onClick={(e) => {
                setTravelerInfoScreen(false);
                setDocumentsScreen(true);
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
      {documentsScreen ? (
        <div>
          <label>Traveler {travelersArr.length}</label>
          <article className="infowrappeople">
            <label>
              Document Type
              <select
              required
                onChange={(e) =>
                  recordDocumentData(e, "documentType", travelerId)
                }
              >
                <option value="PASSPORT">Passport</option>
                <option value="IDENTITY_CARD">National ID Card</option>
                <option value="IDENTITY_CARD">Drivers License</option>
                <option value="IDENTITY_CARD">Military ID Card</option>
              </select>
            </label>
            <label>
              Birth Place
              <input
                onChange={(e) =>
                  recordDocumentData(e, "birthPlace", travelerId)
                }
              ></input>
            </label>
            <label>
              Issuing Country
              <input
              required
                maxLength={2}
                placeholder="Ex: US"
                onChange={(e) =>
                  recordDocumentData(e, "issuanceCountry", travelerId)
                }
              ></input>
            </label>
            <label>
              Expiration Date
              <input
                type="date"
                onChange={(e) =>
                  recordDocumentData(e, "expiryDate", travelerId)
                }
              ></input>
            </label>
            <label>
              Document Number
              <input
              required
                type="number"
                onChange={(e) => recordDocumentData(e, "number", travelerId)}
              ></input>
            </label>
            {countrySearchPopUp ? (
              <label className="countrypopup">
                Please input your location city and country
                <input
                  list="locationslist"
                  onChange={(e) => updateSearchParams(e)}
                ></input>
                <datalist id="locationslist">
                  <option value={autocompleteOne}>dd</option>
                </datalist>
              </label>
            ) : null}
            <label>
              Nationality
              <input
              required
                maxLength={2}
                placeholder="Ex: UK"
                onChange={(e) => {
                  recordDocumentData(e, "nationality", travelerId);
                }}
              >
                {/* <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="null"> "Don't see your country?"</option> */}
              </input>
            </label>
            <button
              type="button"
              className="nextbtn"
              onClick={(e) => {
                setDocumentsScreen(false);
                setConfirmationScreen(true);
                passportInfo.push(travelersArr[travelerId].documents[0]);
                personalInfo.push(travelersArr[travelerId].name);
                // personalInfo.push(travelersArr[travelerId].name)
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
      {confirmationScreen ? (

        <section className="travelerinfowrap">  
          <h1 className="travheader">Traveler: {travelersArr.length} </h1>
          <section className="infosection">
            <article>
                <h1>Traveler Information: </h1>
                <h2><div>Name: </div>
                {loopedObject[2][1].firstName} {loopedObject[2][1].middleName}{" "}
                {loopedObject[2][1].lastName} {loopedObject[2][1].suffix}</h2>
      

                <h2><div>Date of Birth: </div>           
              {formatDate(loopedObject[1][1])}</h2>
              <h2> <div>Gender: </div>
              {loopedObject[3][1]} </h2>
            </article>
            <article>
            <h1>Documents: </h1>
              <h2>Document Type: {loopedObject[5][1][0].documentType}</h2>
              <h2>Document Number: {loopedObject[5][1][0].number}</h2>
              <h2>Issuing Country: {loopedObject[5][1][0].issuanceCountry}</h2>
              <h2>Expiration Date: {formatDate(loopedObject[5][1][0].expiryDate)}</h2>
              <h2>Place of Birth: {loopedObject[5][1][0].birthPlace}</h2>
            </article>{" "}
          </section>
          <h1>Address:</h1>
          <h2>
            {" "}
            {loopedObject[4][1].address.lines},{" "}
            {loopedObject[4][1].address.cityName},{" "}
            {loopedObject[4][1].address.stateName}
            {loopedObject[4][1].address.countryCode}{" "}
            {loopedObject[4][1].address.postalCode}

          </h2>
          {/* {Object.entries(travelersArr[travelerId][0])} */}
          {console.log(finalTravelerNumber)}
          {/* {setTravelerId(travelerId > 1 ? travelersArr.length - 1 : travelerId + 1)} */}
          {travelersArr.length === finalTravelerNumber ? (          
           <button type='button' onClick={confirmFlightOffer}className="selectOfferBtn">Buy Offer</button>
          ) : (
            <button
              type="button"
              className="nextbtn"
              onClick={(e) => {
                setConfirmationScreen(false);
                setTravlerCount(true);
                setTravelerId(travelersArr.length - 1)
              }}
            >
              Next {console.log(travelerId )}
            </button>
          )}{" "}
        </section>
      ) : null}
    </form>
  );
}
export default TravelerInfoModal;
