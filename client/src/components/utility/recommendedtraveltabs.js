import "../../css/utility/recommendedtabs.css";
import { useEffect, useState, useRef } from "react";
import { InView } from 'react-intersection-observer';
import { useInView } from 'react-intersection-observer';
//--------------End of module imports---------------//


export function RecommendedTab({ img, cityName }) {
    const [isVisible, setIsVisible] = useState(false);
     const { ref, inView, entry } = useInView({
        threshold: 1,
        // rootMargin:
     });
     
  return (
    
    <li className={inView ? "recommendedtabsanimation" : 'recommendedtabs'} ref={ref}>
       
      {" "}
      <div className="imgwrap">
      {inView ? <img className="recommendedtabsimg" src={img}></img> : null}
      </div>
      
      <div className="optionswrap" >
        <div className="textwraps" >{inView ? <ul>
          <li>
          Hotels
          </li>
          <li> Flights</li>
          <li> Activities</li>
          </ul> : null}</div>
       
        {/* <InView as="div" onChange={(inView, entry) => 
    <h1>Hotels | Activities</h1>}>
     
  </InView> */}
      </div>
    </li> 
  );
}
export default RecommendedTab;
