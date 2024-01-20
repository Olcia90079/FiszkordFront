import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import './style.css';
import { setUserGroups as refreshGroups, setGroup, setSubject } from '../Store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const DeckForm = () => {

    const [name, setName] = useState('');
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const groupId = useSelector((state) => state.groupId);
    const subject = useSelector((state) => state.subject);

    const isLogged = useSelector(state => state.isLogged);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/deck/create', {
            groupId: groupId,
            subjectId: subject.id,
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }).then(_ => navigate("/fiszki"))
        .catch(e => console.log(e))
    }

    return (
        <>
            {isLogged &&
            <>
              <div>
                <h2>Dodaj talię</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nazwa:
                        <input type="text" name="name" onChange={e => setName(e.target.value)} />
                    </label>
                    <input type="submit" value="Zatwierdź" />
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

export default DeckForm;