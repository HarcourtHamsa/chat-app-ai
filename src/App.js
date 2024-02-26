import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import InsightPage from "./pages/insight";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/insight" element={<InsightPage />} />
          <Route  exact path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
