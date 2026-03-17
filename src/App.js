import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Travel from "./Travel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel/:placeName" element={<Travel />} />
      </Routes>
    </BrowserRouter>
  );
}
