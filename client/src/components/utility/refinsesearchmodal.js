import "../../css/utility/travelersmodal.css";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";


export { RefineSearchPopup, searchParams}

const searchParams = {
    cabinClass:'ECONOMY',
    maxPrice:5000,
    nonstop:false,
};
 function RefineSearchPopup({ close, cabin, maxPrice, nonStop, className }) {
    const [adultTravelers, setAdultTravelers] = useState();
    const [childrenTravelers, setchildrenTravelers] = useState();
    const [refineSearchPopup, setRefineSearchPopup] = useState(true);
    
    const recordMaxPrice = (e) => {
        searchParams.maxPrice = parseInt(e.target.value);
        setAdultTravelers(e.target.value)
    };
    const recordNonStop = (e) => {
        searchParams.nonstop = (e.target.value)
    };
    const recordCabinClass = (e) => {
        searchParams.cabinClass = (e.target.value);
    };
  return (

    <section className={className}>
            
            <label className="travelerlabelwraps">
                <h1 className="travelertypeh1">Cabin Class</h1>
            <select onChange={(e) => {recordCabinClass(e)}} className="travelersselectinput">
            <option value="" disabled selected></option>
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
            </select></label>
        <label className="travelerlabelwraps">
            <h1 className="travelertypeh1" >Max Price</h1>
        <input type='number' placeholder='500.00' onChange={(e) => {recordMaxPrice(e)}} className="travelersselectinput">
            </input>
            </label>
            <label className="travelerlabelwraps">
            <h1 className="travelertypeh1" >Direct Flight?</h1>
        <select onChange={(e) => {recordNonStop(e)}} className="travelersselectinput">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            </label>

            <button onClick={(e) => {close(); cabin(); maxPrice(); nonStop();}} type="button" className="travelersconfirmbtn">Confirm</button>

    </section>
  )
}
export default RefineSearchPopup;
