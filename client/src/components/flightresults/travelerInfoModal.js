import { useState, useEffect } from "react";
import { queryResponseObj } from "../utility/flightquerymodel";
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
  const [confirmationScreenData, setConfirmationScreenData] = useState([]);
  const [travelersArr, setTravelersArr] = useState([]);
  const [travelerId, setTravelerId] = useState(travelersArr.length);
  const [travelersInfo, setTravelerInfo] = useState({
    id: "1",
    dateOfBirth: "1990-01-01",
    name: {
      firstName: "John",
      lastName: "Doe",
      title: "MR",
      middleName: "Middle",
      suffix: "Jr",
    },
    gender: "MALE",
    contact: {
      emailAddress: "johndoe@example.com",
      phones: [
        { deviceType: "MOBILE", countryCallingCode: "1", number: "5555555555" },
      ],
      address: {
        lines: ["123 Main St"],
        postalCode: "12345",
        cityName: "Anytown",
        countryCode: "US",
        stateCode: "NY",
      },
    },
    documents: [
      {
        documentType: "PASSPORT",
        birthPlace: "New York, NY",
        issuanceCountry: "US",
        expiryDate: "2025-01-01",
        number: "123456789",
        holder: true,
        nationality: "US",
      },
    ],
  });
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
    const id = (travelersArr.length + 1);
     const newObj = {
      id: id.toString(),
      dateOfBirth: "1990-01-01",
      name: {
        firstName: "John",
        lastName: "Doe",
        title: "MR",
        middleName: "Middle",
        suffix: "Jr",
      },
      gender: "MALE",
      contact: {
        emailAddress: "johndoe@example.com",
        phones: [
          { deviceType: "MOBILE", countryCallingCode: "1", number: "5555555555" },
        ],
        address: {
          lines: ["123 Main St"],
          postalCode: "12345",
          cityName: "Anytown",
          countryCode: "US",
          stateCode: "NY",
        },
      },
      documents: [
        {
          documentType: "PASSPORT",
          birthPlace: "New York, NY",
          issuanceCountry: "US",
          expiryDate: "2025-01-01",
          number: "123456789",
          holder: true,
          nationality: "US",
        },
      ],
     };
      // let newObj = Object.create(travelersInfo);
      console.dir(newObj);
      console.log(travelersInfo);
      travelersArr.push(newObj);
    console.log(travelersArr);
    setTravlerCount(false);
    setEmailScreen(true);
  };
  //Changes the ORDER email and contact number, changing it
  //on the obj template so all descendents have mathching values
  const recordOrderEmail = (e, value) => {
    value = "emailAddress"
      ? (travelersInfo.contact[value] = e.target.value)
      : (travelersInfo.contact.phones[0][value] = e.target.value);
  };
  const recordTravelerInfo = (e, key, nestedkey, travelerId) => {
    console.log(travelersArr)
    console.log(key,nestedkey,travelerId)
    nestedkey === null
      ? (travelersArr[travelerId][key] = e.target.value)
      : (travelersArr[travelerId][key][nestedkey] = e.target.value);
    // travelersArr[travelerId].firstName = e.target.value
      console.log(travelersArr)
  };
  const recordTravelerAddress = (e, key, travelerId) => {
    travelersArr[travelerId].contact.address[key] = e.target.value;
  };
  const recordDocumentData = (e, key, travelerId) => {
    if (e.target.value === "null") {
      setCountrySearchPopUp(true);
    } else {
      travelersArr[travelerId].documents[0][key] = e.target.value;
      console.dir(travelersArr[0]);
      setConfirmationScreenData( travelersArr[travelerId])
      // updateSearchParams(e)
    }
    console.dir(travelersArr)
  };
  const updateSearchParams = (e) => {
    console.log(e.target.value);
    locationSearch(e.target.value);
  };
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
      console.log(x);
    } catch (err) {
      console.log(err);
    }
  };
const finalTravelerNumber = queryResponseObj[0].travelerCounts.adults + queryResponseObj[0].travelerCounts.children
  return (
    
    <form className={ openModal === true ? "travelersinfomodal" : "hide"}>
      {travelerCount ? (
        <section> 
          
          <h1>Traveler {travelerId + 1} of {finalTravelerNumber}</h1>
          <button type="button" onClick={confirmTravNum}>
        Confirm{" "}
      </button></section>
       
      ) : null}
      {emailScreen === true ? (
        <article className="infowrap">
          <h1>
            To change the order traveler count, please create a new search.{" "}
          </h1>
          <label>
            <button></button>
            Email For Order
            <input
              onChange={(e) => recordOrderEmail(e, "emailAddress")}
              type="email"
            ></input>
          </label>
          <label>
            Phone # For Order
            <input
              onChange={(e) => recordOrderEmail(e)}
              max={10}
              type="number"
            ></input>
          </label>
            <button
            className="nextbtn"
            onClick={(e) => {
              setEmailScreen(false);
              setTravlerCount(true);
            }}
          >
            
            back
          </button>
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
        <div>
          <label>Traveler {travelerId + 1}</label>
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
                onChange={(e) =>
                  recordTravelerInfo(e, "name", "lastName", travelerId)
                }
              ></input>
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                onChange={(e) =>
                  recordTravelerInfo(e, "dateOfBirth", null, travelerId)
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
              Gender
              <select
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
              <input></input>
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
                      onChange={(e) =>
                        recordTravelerAddress(e, "lines", travelerId)
                      }
                    ></input>
                  </label>
                  <label>
                    City
                    <input
                      onChange={(e) =>
                        recordTravelerAddress(e, "cityName", travelerId)
                      }
                    ></input>
                  </label>
                  <label>
                    State
                    <select
                      onChange={(e) =>
                        recordTravelerAddress(e, "stateCode", travelerId)
                      }
                    >
                      <option value=""></option>
                      {stateCodes.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value};
                          </option>
                        );
                      })}
                      ;
                    </select>
                  </label>
                  <label>
                    Country
                    <input
                      onChange={(e) =>
                        recordTravelerAddress(e, "countryCode", travelerId)
                      }
                    ></input>
                  </label>
                  <label>
                    Zip Code
                    <input
                      onChange={(e) =>
                        recordTravelerAddress(e, "postalCode", travelerId)
                      }
                    ></input>
                  </label>
                  <button
                    type="button"
                    onClick={(e) => setAddressScreen(false)}
                  >
                    Confirm
                  </button> 
                </div> 
              
            ) : null} 
            <button
              className="pplscreenbtn"
              onClick={(e) => {
                setTravelerInfoScreen(false);
                setEmailScreen(true);
              }}
            >
              Back To Contact Info
            </button>
            <button
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
      {/* </CSSTransition> */}
      {/* {addressScreen ?      <form><label>Street Address
              <input></input>
          </label>
          <label>Street Address
              <input></input>
          </label>
          <label>Street Address
              <input></input>
          </label>
          <label>Street Address
              <input></input>
          </label></form> : null} */}
      {documentsScreen ? (
        <div>
          <label>Travs</label>{" "}
          <article className="infowrappeople">
            <label>
              Document Type
              <select
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
              className="nextbtn"
              onClick={(e) => {
                setDocumentsScreen(false);
                setTravelerInfoScreen(true);
              }}
            >
              Back To Traveler Info
            </button>
            <button
            type='button'
              className="nextbtn"
              onClick={(e) => {
                setDocumentsScreen(false);
                setConfirmationScreen(true);
               
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
      {confirmationScreen ? 
      <div>
        {console.log(travelersArr)}
        Name {travelersArr[travelerId].name.firstName + ' ' + travelersArr[travelerId].name.lastName}
      {travelersArr.length === finalTravelerNumber ? <button onClick={btnClick} type='button'>DONE</button>: <button
      type='button'
              className="nextbtn"
              onClick={(e) => {
                  setConfirmationScreen(false);
                  setTravlerCount(true);
                  setTravelerId(travelersArr.length);
                  // openModal = () => {
                  //   openModal(false)
                  // }
              
                  
               
              }}
            >
              Next
            </button>} </div>: null}
      
    </form> 
  );
}
export default TravelerInfoModal;
