import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import './style.css';
import { setUserGroups as refreshGroups, setDeck, setGroup, setSubject } from '../Store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Decks = () => {

    const [flashcards, setFlashcards] = useState([]);

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const groupId = useSelector((state) => state.groupId);
    const subject = useSelector((state) => state.subject);

    const isLogged = useSelector(state => state.isLogged);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/deck/subject-decks?subjectId=${subject.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }).then(res => {
          setFlashcards(res.data)
        }).catch(e => console.log(e))
    }, [subject]);

    const handleFlashcardClick = (deck) => {
      dispatch(setDeck(deck))
      navigate("/talia")
    }

    return (
        <>
            {isLogged &&
            <>
              <div>
                <h2>Talie</h2>
                {flashcards.length===0 && <div>Nie znaleziono fiszek dla przedmiotu <i>{subject.name}</i>.</div>}
                <div className='deck-list'>
                  {flashcards.map(e => <>
                    <div key={e.id} className='deck' onClick={() => handleFlashcardClick(e)}>
                      <div className='deck-content'>{e.name}</div>
                    </div>
                  </>)}
                </div>
              </div>
              <Link to="/fiszki/dodajTalie"><button className='button'>Dodaj talię</button></Link>
            </>
            }
            {!isLogged && (
                <div className="container">
                    <h2>Powinieneś się najpierw zalogować lub zarejestrować, nie sądzisz? ;) </h2>
                </div>
            )}
        </>
    );
}

export default Decks;