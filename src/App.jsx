import "./App.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SongPage from "./pages/SongPage/SongPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/"><li>home</li></Link>
          <Link to="/song"><li>song</li></Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song" element={<SongPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
