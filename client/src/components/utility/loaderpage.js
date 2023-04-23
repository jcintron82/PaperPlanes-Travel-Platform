import BounceLoader from "react-spinners/BounceLoader";
import PlaneSVG from '../../images/plane.svg'
export const LoadingPage = () => {
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