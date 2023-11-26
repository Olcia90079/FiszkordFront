import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/aktualnosci" element={<h1>Aktualności</h1>} />
        <Route path="/fiszki" element={<h1>Fiszki</h1>} />
        <Route path="/pliki" element={<h1>Pliki</h1>} />
        <Route path="/czat" element={<h1>Czat</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
