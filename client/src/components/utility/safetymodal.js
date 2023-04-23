import { useState, useEffect, useRef } from "react";
import "../../css/utility/safetymodal.css";
import RiseLoader from "react-spinners/RiseLoader";
export const SafetyModal = () => {
  const [latitude, setLatitude] = useState(25.79334);
  const [longitude, setLongitude] = useState(-80.28999);
  const [fullLocation, setFullLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState({
    overall: {
      score: 0,
      scoreName: "Overall",
    },
    lgbtq: {
      score: 0,
      scoreName: "LGBTQ",
    },
    political: {
      score: 0,
      scoreName: "Political",
    },
    women: {
      score: 0,
      scoreName: "Solo Female",
    },
    theft: {
      score: 0,
      scoreName: "Theft",
    },
    physicalHarm: {
      score: 0,
      scoreName: "Physical Harm",
    },
  });
  const [autocompleteOne, setautocompleteOne] = useState("");
  const [autocompleteTwo, setautocompleteTwo] = useState("");
  const [autocompleteThree, setautocompleteThree] = useState("");
  const inputRef = useRef(null);
  const tokenRef = useRef(null);
  const [latLongBody, setLatLongBody] = useState({
    latitude: 0,
    longitude: 0,
  });
  async function postCityRatings(input) {
    console.log(latLongBody.latitude)
    const token = await fetchAuth();
    setIsLoading(true);
     await fetch('http://localhost:8000/locationratings', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(latLongBody),
    });
    const pull = await fetch(`https://test.api.amadeus.com/v1/location/analytics/category-rated-areas?latitude=41.397158&longitude=2.160873`,
    // const pull = await fetch('http://localhost:8000/locationratings',
    {
      headers: {
        Accept: "application/vnd.amadeus+json",
        Authorization: token,
      },
    })
    const data = await pull.json();
    console.log(data);
    // const scores = data.data[0].safetyScores;
    // setScores((prevScores) => ({
    //   ...prevScores,
    //   overall: {
    //     score:scores.overall,
    //     scoreName:'Overall'
    //   },
    //   lgbtq: {
    //     score:scores.lgbtq,
    //     scoreName:'LGBTQ'
    //   },
    //   political: {
    //     score:scores.politicalFreedom,
    //     scoreName:'Political Freedom'
    //   },
    //   theft: {
    //     score:scores.theft,
    //     scoreName:'Theft'
    //   },
    //   physicalHarm: {
    //     score:scores.physicalHarm,
    //     scoreName:'Physical Harm'
    //   },
    //   women: {
    //     score:scores.women,
    //     scoreName:'Solo Female'
    //   },
    // }));
    setIsLoading(false);
    // setFullLocation(data)
  }
  const updateSearchParams = async (e) => {

    updateAutoValues(e.target.value);
  };

  async function fetchAuth(input) {
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
    return data.token_type + " " + data.access_token;
  };
  const updateAutoValues = async (input) => {
    const token = await fetchAuth();
    // let token = "";
    // const fetchAuth = await fetch(
    //   "https://test.api.amadeus.com/v1/security/oauth2/token",
    //   {
    //     body:
    //       "grant_type=client_credentials&client_id=" +
    //       process.env.REACT_APP_CLIENT_ID +
    //       "&client_secret=" +
    //       process.env.REACT_APP_CLIENT_SECRET,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     method: "POST",
    //   }
    // );
    // const data = await fetchAuth.json();
    // token = data.token_type + " " + data.access_token;
    fetchAuth();
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
      setautocompleteOne(data.data[0].name);
      setautocompleteTwo(data.data[1].name);
      setautocompleteThree(data.data[2].name);
      setLatLongBody((oldCoords) => ({
        ...oldCoords,
        latitude: data.data[0].geoCode.latitude,
        longitude: data.data[0].geoCode.longitude,
      }))
      //These can be updated without issue since when the user clicks search, they will always hold
      //the correct value as the cities arr dwindles with options
      // latLongBody.latitude = data.data[0].geocode.latitude;
      // latLongBody.latitude = 
      // latLongBody.longitude = data.data[0].geocode.latitude;
      console.log(latLongBody)
    } catch (err) {
      console.log(err)
    }
  };
   
  const getBackgroundColor = (score) => {
    if (score === 0) {
      return "white"
    }
    else if (40 > score) {
      return "#1bb55f";
    } else if (score >= 41 && score < 70) {
      return "rgb(255, 211, 23)";
    } else {
      return "#EF4444";
    }
  };
  return (
    <article className="mainweatherwrap">
      {isLoading ? (
        <RiseLoader
          color="#0284C7"
          speedMultiplier={1}
          size={60}
          cssOverride={{
            position: "relative",
            top: "50%",
            left: "25%",
            height: 0,
            zIndex:999
          }}
        />
      ) : null}
      <h1>City Safety Search</h1>
      <label className="inputlabel">
        <input
          className="safetyinput"
          ref={inputRef}
          autoComplete="off"
          list="citylist"
          id="city-list-complete"
          required
          onChange={(e) => updateSearchParams(e)}
          placeholder="Philadelphia"
        ></input>

        <datalist id="citylist">
          <option value={autocompleteOne}></option>
          <option value={autocompleteTwo}></option>
          <option value={autocompleteThree}></option>
        </datalist>
        <button type="button" onClick={() => postCityRatings(inputRef.current.value)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>magnify</title>
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>
        <div>
          <h1>{fullLocation}</h1>
        </div>
      </label>
      <article>
        {Object.entries(scores).map((item) => {
          return (
            <div>
              <h1>{item[1].scoreName}</h1>
              <span style={{ backgroundColor: getBackgroundColor(item[1].score) }}>
                {item[1].score}
              </span>
            </div>
          );
        })}
        {/* <div>
          <h1>LGBTQ</h1>
          <span style={{backgroundColor: getBackgroundColor(scores.lgbtq)}}>{scores.lgbtq}</span>
        </div>
        <div>
          <h1>Political</h1>
          <span>{scores.political}</span>
        </div>
        <div>
          <h1>Women</h1>
          <span>{scores.women}</span>
        </div>
        <div>
          <h1>Theft</h1>
          <span>{scores.theft}</span>
        </div>
        <div>
          <h1>Physical Harm</h1>
          <span>{scores.physicalHarm}</span>
        </div> */}
      </article>
      <h6>
        A higher score indicates a higher liklihood of that particular
        trasgression occuring
      </h6>
    </article>
  );
};

export default SafetyModal;
