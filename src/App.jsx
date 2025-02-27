import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import GamePage from "./components/GamePage/GamePage";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:genre" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
)
}

export default App;
