import { useState, useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { FinalBookingModal } from './finalbookingmodal.js'
import { queryResponseObj } from "../utility/flightquerymodel";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BounceLoader from "react-spinners/BounceLoader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../css/flightresults/detailsmodal.css";
import "../../css/flightresults/travelersinfomodal.css";


export function TravelerInfoModal({ openModal, selectIndex, completeBooking }) {
  const [autocompleteOne, setAutoCompleteOne] = useState("test");
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [countrySearchPopUp, setCountrySearchPopUp] = useState(false);
  const [emailScreen, setEmailScreen] = useState(false);
  const [addressScreen, setAddressScreen] = useState(false);
  const [travelerCount, setTravlerCount] = useState(true);
  const [travelerInfoscren, setTravelerInfoScreen] = useState(false);
  const [documentsScreen, setDocumentsScreen] = useState(false);
  const [confirmationScreen, setConfirmationScreen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [buyOffer, setBuyOffer] = useState(false);
  const [openFinalBookingModal, setBookingModal] = useState(completeBooking ? false : true);
  const [confirmationScreenData, setConfirmationScreenData] = useState([]);
  const [travelerAddressPlaceholder, setTravelerAddressPlaceholder] =
    useState("");
  const [travelersArr, setTravelersArr] = useState([]);
  const [travelerId, setTravelerId] = useState(0);
  const [travelersInfo, setTravelerInfo] = useState({
    contact: {
      emailAddress: "",
      phones: [
        { deviceType: "MOBILE", countryCallingCode: "1", number: "" },
      ],
    },
  });
  useEffect(() => {

  }, [addressScreen]);

  const navigate = useNavigate();
  const passportInfo = [];
  const personalInfo = [];
  const loopedObject = travelersArr.length < 1 ? null : Object.entries(travelersArr[travelersArr.length - 1]);
  const formatDate = (value) => {
    const parts = value.split('-');
    const date = new Date(parts[1] +'-'+parts[2]+'-'+parts[0]);
    const options = { month:'long', day:'numeric', year:'numeric', time:'none'};
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
    //SnackBar logic
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleAddressClose = () => {
      setSnackbarOpen(false);
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
    const clearValues = (obj) => {
      for (const key in obj) {
        obj[key] = '';
      }
    }
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
  if (!queryResponseObj[1].message){
    return navigate('/')
  } 
  
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
      key === 'lines' ? travelersArr[index].contact.address.lines = capitalizedWords :
      travelersArr[index].contact.address[key] = capitalizedWords;
    }
  }
  const recordDocumentData = (e, key, travelerId) => {
    const index = travelersArr.length - 1;
    const capitalizedWords = capitalizeWords(e.target.value);
    if (e.target.value === "null") {
      setCountrySearchPopUp(true);
    }
    if (key === "nationality" || key === "issuanceCountry") {
      travelersArr[index].documents[0][key] = e.target.value.toUpperCase();
      setConfirmationScreenData(travelersArr[travelerId]);
    } else {
      travelersArr[index].documents[0][key] = capitalizedWords;
      setConfirmationScreenData(travelersArr[travelerId]);
    }
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
    //Converting the converted carrier code back to its airline code for
    //search purposes
    queryResponseObj[1].message.data[selectIndex].itineraries[0].segments[0].carrierCode = 
    queryResponseObj[1].message.data[selectIndex].itineraries[0].segments[0].operating.carrierCode;
    if(queryResponseObj[1].message.data[0].itineraries[1]){
      queryResponseObj[1].message.data[selectIndex].itineraries[1].segments[0].carrierCode = 
    queryResponseObj[1].message.data[selectIndex].itineraries[1].segments[0].operating.carrierCode;
    }
    setBuyOffer(true);
      const pull = await fetch("https://paperplanes-server.vercel.app/flightconfirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([queryResponseObj[1].message.data[selectIndex], travelersInfo])
      });
      const x = await pull.json()
      queryResponseObj.finalBookingInfo = x;
      setBuyOffer(false);
      // completeBooking();
      setBookingModal(() => {setBookingModal(true)});
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
    //MUI modal code, open state at top of fil
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '75vw',
      maxHeight:'70vh',
      padding:'.5rem',
      maxWidth:'30rem',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '10px',
      border:'none',
      display:'flex',
      justifyContent:'center',
      marginTop:0,
      paddingBottom:'12%',
      paddingTop:'1rem',  
      overflowX: 'scroll'
    
    };

  return (
    <form className={openModal === true ? travelerInfoscren ? "travelersinfomodal2" : "travelersinfomodal" : "hide"}>
 
      {openFinalBookingModal ? <FinalBookingModal /> : null}
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
             <Snackbar 
             open={open}
             autoHideDuration={6000}
             onClose={handleClose}
             message="Please fill out all input fields."
             action={action}/>
          <label>
            Email for Order
            <input
            required
              onChange={(e) => recordOrderEmail(e, "emailAddress")}
              type="email"
              placeholder="example@email.com"
            ></input>
          </label>
          <label>
            Phone Number for Order
            <input
            required
              onChange={(e) => recordOrderNum(e, "number")}
              type="number"
              maxLength="12"
              placeholder="610-555-8282"
            ></input>
          </label>
          <button
          type="button"
            className="nextbtn"
            onClick={(e) => {
              if(travelersInfo.contact.phones[0].number === '' || travelersInfo.contact.emailAddress === ''){
                setOpen(true);
              }
              else {
                setEmailScreen(false);
                setTravelerInfoScreen(true);
              };
            }}
          >
            Next
          </button>
        </article>
      ) : null}
      {travelerInfoscren ? (
        <div className="travwrap">
        <h1 className="travheader">Traveler {travelersArr.length} </h1>
          <article className={"infowrappeople"}>
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
              First Name*
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
              Last Name*
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
              Date of Birth*
              <input
              required
                type="date"
                onChange={(e) =>
                  recordTravelerInfo(e, "dateOfBirth", null, travelerId)
                }
              ></input>
            </label>
            <label>
              Gender*
              <select
              required
                onChange={(e) =>
                  recordTravelerInfo(e, "gender", null, travelerId)
                }
              >
                <option value=""></option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </label>
            <label>
              Street Address*
              <input
              disabled
              required
                type="text"
                placeholder={travelerAddressPlaceholder}
                // onFocus={() => {!snackbarOpen ? null : setSnackbarOpen(true); clearValues(travelersArr[0].contact.address)}}
              ></input>
            </label>
           
               <Modal
               open={snackbarOpen}
               onClose={handleAddressClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
             >
               <Box sx={style}>
                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <div >
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
                 id="stateselect"
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
                 Country Code
                 <input
                 type="text"
                 maxLength={2}
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
                 type="number" pattern="\d*" maxlength="5"
                 onChange={(e) => {
                   const value = e.target.value;
                   if (value.length > 5) {
                     e.target.value = value.slice(0, 5);
                   }
                   recordTravelerAddress(e, "postalCode", travelerId);
                 }}
                 ></input>
               </label>
                  <Snackbar 
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please fill out all input fields."
            action={action}/>
            <button
               className="nextbtn"
               id="addressbtn"
                 type="button"
                 onClick={(e) => {

                   if(travelersArr[travelersArr.length - 1].contact.address.countryCode === '' || travelersArr[travelersArr.length - 1].contact.address.cityName === '' || travelersArr[travelersArr.length - 1].contact.address.stateCode === '' ||
                   travelersArr[travelersArr.length - 1].contact.address.lines[0] === '' || travelersArr[travelersArr.length - 1].contact.address.postalCode === ''){
                     setOpen(true)
                   }
                   else{
                    setSnackbarOpen(false);
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
                   }
                 }}
               >
                 Confirm
               </button> </div>.
                 </Typography>
               </Box>
             </Modal>
             
{/* 
            ) : null} */}
                <Snackbar 
             open={open}
             autoHideDuration={6000}
             onClose={handleClose}
             message="Please fill out the required fields."
             action={action}/>
            <button
              type="button"
              className="pplscreenbtn"
              onClick={(e) => {
                if(travelersArr[travelersArr.length - 1].name.firstName === '' || travelersArr[travelersArr.length - 1].name.lastName  === '' || travelersArr[travelersArr.length - 1].name.firstName  === '' ||
                travelersArr[travelersArr.length - 1].dateOfBirth === '' || travelersArr[travelersArr.length - 1].gender === '' || travelersArr[travelersArr.length - 1].contact.address.lines[0] === ''){
                  setOpen(true)
                }
                else{
                  setTravelerInfoScreen(false);
                  setDocumentsScreen(true);
                }
               
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
      {documentsScreen ? (
        <div id="documents">
          <h1 className="travheader">Traveler {travelersArr.length} </h1>
          <article className="infowrappeople">
            <label>
              Document Type*
              <select
              required
                onChange={(e) =>
                  recordDocumentData(e, "documentType", travelerId)
                }
              >
                <option value=""></option>
                <option value="PASSPORT">Passport</option>
                <option value="IDENTITY_CARD">National ID Card</option>
                <option value="IDENTITY_CARD">Drivers License</option>
                <option value="IDENTITY_CARD">Military ID Card</option>
              </select>
            </label>
            <label>
              Birth Place*
              <input
                onChange={(e) =>
                  recordDocumentData(e, "birthPlace", travelerId)
                }
              ></input>
            </label>
            <label>
              Issuing Country*
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
              Expiration Date*
              <input
                type="date"
                onChange={(e) =>
                  recordDocumentData(e, "expiryDate", travelerId)
                }
              ></input>
            </label>
            <label>
              Document Number*
              <input
              required
                type="number"
                onChange={(e) => recordDocumentData(e, "number", travelerId)}
              ></input>
            </label>
            <label>
              Nationality*
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
            <Snackbar 
             open={open}
             autoHideDuration={6000}
             onClose={handleClose}
             message="Please fill out all input fields."
             action={action}/>
            <button
              type="button"
              className="nextbtn"
              onClick={(e) => {
                if(travelersArr[travelersArr.length - 1].documents[0].birthPlace === '' || travelersArr[travelersArr.length - 1].documents[0].documentType === '' || travelersArr[travelersArr.length - 1].documents[0].expiryDate === '' ||
                travelersArr[travelersArr.length - 1].documents[0].issuanceCountry === '' || travelersArr[travelersArr.length - 1].documents[0].nationality === '' || travelersArr[travelersArr.length - 1].documents[0].number === ''){
                  setOpen(true);
                }
                else{
                  setDocumentsScreen(false);
                  setConfirmationScreen(true);
                  passportInfo.push(travelersArr[travelerId].documents[0]);
                  personalInfo.push(travelersArr[travelerId].name);
                  // personalInfo.push(travelersArr[travelerId].name)
                }
               
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
      {confirmationScreen ? (

        <section className="travelerinfowrap">  
          <h1 className="travheader">Traveler {travelersArr.length} </h1>
          <section className="infosection">
            <article className="namewrap">
                <h2 className="namechild1"><div>Name: </div>
                {loopedObject[2][1].firstName} {loopedObject[2][1].middleName}{" "}
                {loopedObject[2][1].lastName} {loopedObject[2][1].suffix}</h2>
                <h2 className="namechild2"><div>Birth Info: </div>           
              {formatDate(loopedObject[1][1])}, {loopedObject[5][1][0].birthPlace}</h2>
              <h2 className="namechild3"> <div>Gender: </div>
              {loopedObject[3][1]} </h2>
              {/* <h2 className="namechild">Place of Birth: {loopedObject[5][1][0].birthPlace}</h2> */}
            </article>
            <article className="documentswrap">
              <h2 className="namechild2"><h3>Document:</h3> <h3>{loopedObject[5][1][0].documentType}</h3></h2>
              <h2 className="namechild1"><h3>Number: </h3><h3>{loopedObject[5][1][0].number}</h3></h2>
              <h2 className="namechild2"><h3>Issuing Country: </h3> <h3>{loopedObject[5][1][0].issuanceCountry}</h3></h2>
              <h2 className="namechild3"><h3>Expiration:</h3><h3>{formatDate(loopedObject[5][1][0].expiryDate)}</h3></h2>
              
            </article>{" "}
            <article  className="namewrap">
          <h1 >Address:</h1>
          <h2>
            {" "}
            {loopedObject[4][1].address.lines},{" "}
            {loopedObject[4][1].address.cityName},{" "}
            {loopedObject[4][1].address.stateName}
            {loopedObject[4][1].address.countryCode}{" "}
            {loopedObject[4][1].address.postalCode}

          </h2></article>
          </section>
        
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
              Next
            </button>
          )}{" "}
        </section>
      ) : null}
    </form>
  );
}
export default TravelerInfoModal;
