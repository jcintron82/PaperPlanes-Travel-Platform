import "../../css/utility/recommendedtabs.css";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
//--------------End of module imports---------------//

export function RecommendedTab({ img, cityName }) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 1,
    // rootMargin:
  });

  return (
    <li
      className={inView ? "recommendedtabsanimation" : "recommendedtabs"}
      ref={ref}
    >
      {" "}
      {/* <div>{cityName}</div> */}
      <div className="imgwrap">

        {inView ? <img className="recommendedtabsimg" src={img}></img> : null}
      </div>
      <div className="optionswrap">
        <div className="textwraps">
          {inView ? (
            <ul>
              <h1>{cityName}</h1>
              <a href='#'>Flights</a>
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}
export default RecommendedTab;
