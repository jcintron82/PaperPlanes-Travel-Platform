import "../../css/utility/travelersmodal.css";
import registerpagepic from '../../images/register/registerpagepic.avif'
import { useState } from "react";


export { TravelersPopup, travelerCounts}

const travelerCounts = {
    adults:1,
    children:0,
};
 function TravelersPopup({ close, numAdults, numChildren }) {
    const [adultTravelers, setAdultTravelers] = useState();
    const [childrenTravelers, setchildrenTravelers] = useState();
    
    const recordAdults = (e) => {
        travelerCounts.adults = parseInt(e.target.value);
        setAdultTravelers(e.target.value)
    };
    const recordChildren = (e) => {
        travelerCounts.children = parseInt(e.target.value);
    };

  return (
    <section type='button' className="travelersnumpopup">
            <label className="travelerlabelwraps">
                <h1 className="travelertypeh1">Adults</h1>
            <select onChange={(e) => {recordAdults(e)}} className="travelersselectinput">
                {/* <option value="" disabled selected>{adultTravelers}</option> */}
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select></label>
        <label className="travelerlabelwraps">
            <h1 className="travelertypeh1" >Children</h1>
        <select onChange={(e) => {recordChildren(e)}} className="travelersselectinput">
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            </label>
            <button onClick={(e) => {close(); numAdults(); numChildren();}} type="button" className="travelersconfirmbtn">Confirm</button>

    </section>
  )
}
export default TravelersPopup;
