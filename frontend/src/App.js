import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LettersPage from "./pages/LettersPage";
import WordsPage from "./pages/WordsPage";
import RhymesPage from "./pages/RhymesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/letters" element={<LettersPage />} />
          <Route path="/words" element={<WordsPage />} />
          <Route path="/rhymes" element={<RhymesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
