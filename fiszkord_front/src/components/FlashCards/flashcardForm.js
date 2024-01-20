import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import './style.css';
import { setUserGroups as refreshGroups, setGroup, setSubject } from '../Store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const FlashcardForm = () => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const groupId = useSelector((state) => state.groupId);
    const subject = useSelector((state) => state.subject);
    const deck = useSelector((state) => state.deck);
    const isLogged = useSelector(state => state.isLogged);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/flashcards/create-flashcard', {
            groupId: groupId,
            deckId: deck.id,
            front: front,
            back: back
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }).then(_ => navigate("/talia"))
        .catch(e => console.log(e))
    }

    const HandleAiClick = (e) => {
      e.preventDefault()
      setIsLoading(true)
      axios.get(`http://localhost:8080/api/gpt/flashcard-hint?groupName=${subject.name}&userPrompt=${front}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
      .then(res => {
        setBack(res.data)
        setIsLoading(false)
      })
      .catch(e => console.log(e))
    }

    return (
        <>
            {isLogged &&
            <>
              <div>
                <h2>Dodaj fiszkę</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Front:
                        <br/>
                        <input type="text" style={{width: "90%"}} name="front" onChange={e => setFront(e.target.value)} />
                        <br/><br/>
                        Tył:
                        <br/>
                        <div className='textarea-box'>
                          <textarea name="back" className='textarea' value={back} disabled={isLoading} onChange={e => setBack(e.target.value)}>
                          </textarea>
                          <button className='ai-button' disabled={front===''} onClick={HandleAiClick}>{isLoading ?<div className='loading-spinner'/> : "AI"}</button>
                        </div>
                        <br/>
                    </label>
                    <input className="button" type="submit" value="Zatwierdź" />
                </form>
                
              </div>
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

export default FlashcardForm;