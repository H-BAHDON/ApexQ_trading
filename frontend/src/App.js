import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Success from "./pages/Success";
import Terms from "./pages/Terms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
