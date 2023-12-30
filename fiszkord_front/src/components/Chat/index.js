// Wiadomości
// Podłączanie do brokera czatu

// Lokalnie uruchomiony serwer będzie działał pod adresem http://localhost:8080/ws.

// Dla wiadomości czatu danego przedmiotu należy zasubskrybować topic /topic/{subjectId}.

// Przy wysyłaniu wiadomości należy użyć ścieżki /app/{subjectId}. Zawartość wiadomości to tekstowy JSON z polami:

//     sender: String (id użytkownika)
//     content: String

// Serwer przesyła do subskrybentów JSON z polami (sender, content, id, date).
// Wiadomości przedmiotu

//     GET /api/message/?subjectId={}&timestamp={}

// Zwraca najnowsze 20 wiadomości dla przedmiotu, opcjonalnie 20 ostatnich wiadomości przed datą timestamp.

// Wymagany parametr:

//     subjectId: Integer

// Opcjonalny parametr

//     timestamp: Timestamp (String formatu yyyy-mm-dd hh:mm:ss.[fff...])

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import './style.css';

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [subjectId, setSubjectId] = useState(1);
    const [sender, setSender] = useState(1);
    const [timestamp, setTimestamp] = useState('2021-01-01 00:00:00.000');

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        axios.get(`http://localhost:8080/api/message/?subjectId=${subjectId}&timestamp=${timestamp}`)
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const sendMessage = () => {
        axios.post(`http://localhost:8080/app/${subjectId}`, {
            sender: sender,
            content: message
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleMessage = (msg) => {
        setMessages([...messages, msg]);
    };

    return (
        <div className="chat-container">
            <SockJsClient url='http://localhost:8080/ws' topics={[`/topic/${subjectId}`]} onMessage={handleMessage} />
            <div className="messages-container">
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-sender">{msg.sender}</div>
                            <div className="message-content">{msg.content}</div>
                        </div>
                    );
                })}
            </div>
            <div className="input-container">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Wyślij</button>
            </div>
        </div>
    );
}

export default Chat;