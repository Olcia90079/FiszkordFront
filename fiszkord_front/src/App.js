import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreateGroup from "./components/Groups/create_group";
import JoinGroup from './components/Groups/join_group';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useSelector } from 'react-redux';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLogged);

  return (
    <Router>
      <Navbar/>
      <div className="app-container">
        {isLoggedIn && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/aktualnosci" element={<h1>Aktualności</h1>} />
            <Route path="/fiszki" element={<h1>Fiszki</h1>} />
            <Route path="/pliki" element={<h1>Pliki</h1>} />
            <Route path="/czat" element={<Chat/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/create-group" element={<CreateGroup/>} />
            <Route path="/join-group" element={<JoinGroup/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
