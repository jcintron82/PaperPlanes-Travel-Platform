import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { FlightResultsWrap } from "../components/flightresultswrap";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flightquery" element={<FlightResultsWrap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
