import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import './style.css';
import { setUserGroups as refreshGroups, setGroup, setSubject } from '../Store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Flashcards = () => {

    const [flashcards, setFlashcards] = useState([]);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null)

    const dispatch = useDispatch();
    const groupId = useSelector((state) => state.groupId);
    const deck = useSelector((state) => state.deck);
    const subject = useSelector((state) => state.subject);

    const isLogged = useSelector(state => state.isLogged);

    console.log(deck)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/flashcards/deck-flashcards?groupId=${groupId}&deckId=${deck.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }).then(res => {
          setFlashcards(res.data)
        }).catch(e => console.log(e))
    }, [deck]);

    return (
        <>
            {isLogged &&
            <>
            {
              selectedFlashcard &&
              <div className='modal-box' onClick={() => setSelectedFlashcard(null)}>
              <div className='modal-element'>
                <div className='modal-text'>
                  {flashcards.find(e => e.id===selectedFlashcard).back}
                </div>
              </div>
            </div>
            }
              <div>
                <h2>Talia <i>{deck.name}</i></h2>
                {flashcards.length===0 && <div>Nie znaleziono fiszek dla talii <i>{deck.name}</i>.</div>}
                <div className='deck-list'>
                  {flashcards.map(e => <>
                    <div key={e.id} className='deck' onClick={() => setSelectedFlashcard(e.id)}>
                      <div className='deck-content'>{e.front}</div>
                    </div>
                  </>)}
                </div>
              </div>
              <Link to="/fiszki/dodajFiszke"><button className='button'>Dodaj fiszkę</button></Link>
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

export default Flashcards;