import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { FlightResultsWrap } from "../components/flightresults/flightresultswrap";
import { SignUpPage } from "../components/utility/signup"
import { Profile } from "../components/utility/profile"
const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flightquery" element={<FlightResultsWrap />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
