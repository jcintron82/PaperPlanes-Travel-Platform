import "../../css/utility/travelersmodal.css";
import registerpagepic from '../../images/register/registerpagepic.avif'
import { useState } from "react";

export { TravelersPopup, travelerCounts}

const travelerCounts = {
    adults:1,
    children:0,
}

 function TravelersPopup() {
    const [adultTravelers, setAdultTravelers] = useState();
    const [childrenTravelers, setchildrenTravelers] = useState();
    
    const updateTravelers = (e) => {
        travelerCounts.adults = e.target.value;
        console.log(e.target.value)
    };

  return (
    <section className="travelersnumpopup">
            <label className="travelerlabelwraps">
                <h1>Adults</h1>
            <select onChange={(e) => {updateTravelers(e)}} className="travelersselectinput">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select></label>
        <label className="travelerlabelwraps">
            <h1>Children</h1>
        <select className="travelersselectinput">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
            </label>
            <button type="button" className="travelersconfirmbtn">Chec</button>

    </section>
  )
}
export default TravelersPopup;
