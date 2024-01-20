import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreateGroup from "./components/Groups/create_group";
import JoinGroup from './components/Groups/join_group';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { login } from './components/Store/actions';
import DeckForm from './components/FlashCards/deckForm';
import Decks from './components/FlashCards';
import Flashcards from './components/FlashCards/details';
import FlashcardForm from './components/FlashCards/flashcardForm';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLogged);
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post('http://localhost:8080/api/auth/refresh-token', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
      }
    }).then(res => {
      console.log("LOGIN: token refreshed")
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      dispatch(login({ access_token: res.data.access_token, refresh_token: res.data.refresh_token }));
    }).catch(e => console.log("LOGIN: refresh token expired"))
  }, [])

  return (
    <Router>
      <Navbar/>
      <div className="app-container">
        {isLoggedIn && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            {/* <Route path="/aktualnosci" element={<h1>Aktualności</h1>} /> */}
            <Route path="/fiszki" element={<Decks/>} />
            <Route path="/talia" element={<Flashcards/>} />
            {/* <Route path="/pliki" element={<h1>Pliki</h1>} /> */}
            <Route path="/czat" element={<Chat/>} />
            <Route path="/fiszki/dodajTalie" element={<DeckForm/>}/>
            <Route path="/fiszki/dodajFiszke" element={<FlashcardForm/>}/>
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
