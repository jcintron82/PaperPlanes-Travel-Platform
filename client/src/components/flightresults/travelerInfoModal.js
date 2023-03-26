import { useState, useEffect } from "react";
import { queryResponseObj } from "../utility/flightquerymodel";
import "../../css/flightresults/detailsmodal.css";
import "../../css/flightresults/travelersinfomodal.css";
export function TravelerInfoModal() {
  const [emailScreen, setEmailScreen] = useState(true);
  const [travelerCount, setTravlerCount] = useState(false);
  const [travelerInfoscren, setTravelerInfoScreen] = useState(false);
  const [documentsScreen, setDocumentsScreen] = useState(false);
  const [travelerId, setTravelerId] = useState(0);
  const [travelersArr, setTravelersArr] = useState([]);
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

  const confirmTravNum = (e) => {
    // setTravlerCount(true);
    e.preventDefault();
    for(let i = 0; i < queryResponseObj[1].message.data[1].travelerPricings.length; i++ ) {
      const newObj = Object.assign({}, travelersInfo);
     
      travelersArr.push(newObj);
    };
    console.log(travelersArr)
  }

  const recordTravelerInfo = (e, key, nestedkey, travelerId) => {
    nestedkey != null ? 
    travelersArr[travelerId][key][nestedkey] = e.target.value :
    travelersArr[travelerId][key] = e.target.value
    console.log(travelersArr)

    // value = 'emailAddress' ? travelersInfo.contact[value] = e.target.value :
    //   travelersInfo.contact.phones[0][value] =e.target.value;
  };
    const recordOrderEmail = (e, value) => {
      value = 'emailAddress' ? travelersInfo.contact[value] = e.target.value :
        travelersInfo.contact.phones[0][value] =e.target.value;
  


    };
    // const value ='';
    // const createTraveler  = (e, key) => {
    // const newTraveler = Object.create(travelersInfo)
    // newTraveler[key] = e.target.value
    // travelersArr.push(newTraveler)
    // console.log(travelersArr);
    // };
  // const arr = []
  // function createTraveler( firstName, lastName) {
  //   let x = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     getFullName() {
  //       return firstName + ' ' + lastName;
  //     },
     
  //   };arr.push(x)
  //   console.log(arr)
  // };
  
  return (
    <form className="travelersinfomodal">
      <button disabled={travelerCount} type='button' onClick={confirmTravNum}>Confirm Travelers </button>
      {emailScreen === true ? (
        <article className="infowrap">
          <label>
            <button></button>
            Email For Order
            <input type="email"></input>
          </label>
          <label>
            Phone # For Order
            <input max={10}  type="number"></input>
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
        <div>
          <label>Traveler {(travelerId+1)}</label>
          <article className="infowrappeople">
            <label>
              Title
              <select onChange={(e) => recordTravelerInfo(e, 'name', 'title', travelerId )}>
              <option value=''></option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Dr'>Dr</option>
              </select>
            </label>
            <label>
              First Name
              <input  onChange={(e) => recordTravelerInfo(e, 'name', 'firstName', travelerId )}></input>
            </label>
            <label>
              Middle Name
              <input onChange={(e) => recordTravelerInfo(e, 'name', 'middleName', travelerId )}></input>
            </label>
            <label>
              Last Name
              <input onChange={(e) => recordTravelerInfo(e, 'name', 'lastName', travelerId )}></input>
            </label>
            <label>
              Date of Birth
              <input type="date"  onChange={(e) => recordTravelerInfo(e,'dateOfBirth',null, travelerId )}></input>
            </label>
            <label>
              Suffix
              <select onChange={(e) => recordTravelerInfo(e,'name', 'suffix', travelerId )}>
                <option value=''></option>
                <option value='Sr'>Sr.</option>
                <option value='Jr'>Jr</option>
                <option value='iii'>III</option>
              </select>
            </label>
            <label>
              Gender
              <select onChange={(e) => recordTravelerInfo(e,'gender',null, travelerId )}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </label>
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
      {documentsScreen ? (
        <div>
          <label>Travs</label>{" "}
          <article className="infowrappeople">
            <label>
              Document Type
              <input></input>
            </label>
            <label>
              Birth Place Listed on Document
              <input onChange={(e) => recordTravelerInfo(e, 'title', travelerId )}></input>
            </label>
            <label>
              Issuing Country
              <input></input>
            </label>
            <label>
              Expiration Date
              <input></input>
            </label>
            <label>
              Document Number
              <input></input>
            </label>
            <label>
              Nationality 
              <input></input>
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
              className="nextbtn"
              onClick={(e) => {
                setDocumentsScreen(false);
              }}
            >
              Next
            </button>
          </article>
        </div>
      ) : null}
    </form>
  );
}
export default TravelerInfoModal;
