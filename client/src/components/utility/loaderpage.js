import BounceLoader from "react-spinners/BounceLoader";
import PlaneSVG from '../../images/plane.svg';
import { useNavigate } from "react-router-dom";
export const LoadingPage = () => {
  const navigate = useNavigate();
  //To send back to homepage if the API call fails for any reason
  const badResponseHandler = () => {
    setTimeout(function() {
      navigate('/')
    }, 10000)
  }
    return (
        <div className="loadingdiv">
            <object className="planeSVG" type="image/svg+xml" data={PlaneSVG}></object>
        <BounceLoader
        speedMultiplier={0.8}
        className="gridloader"
        size={600}
        color="#05203C"
        cssOverride={{
          position: "absolute",
        }}
        // size={width > breakpoint ? 500 : 300}
      /></div>
    )
}
export default LoadingPage;