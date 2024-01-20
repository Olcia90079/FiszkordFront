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

import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import './style.css';
import { setUserGroups as refreshGroups, setGroup, setSubject } from '../Store/actions';
import { useSelector, useDispatch } from 'react-redux';

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState(1);
    const [timestamp, setTimestamp] = useState('2021-01-01 00:00:00.000');
    const [client, setClient] = useState(null);
    const [userGroups, setUserGroups] = useState([])

    const dispatch = useDispatch();
    const groupId = useSelector((state) => state.groupId);
    const subject = useSelector((state) => state.subject);

    const isLogged = useSelector(state => state.isLogged);

    useEffect(() => {
        setMessages([])
        /*axios.post('http://localhost:8080/api/group/create', { name: 'chatTest', code: 'TEST123' }, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } })
        .then(_ => axios.post('http://localhost:8080/api/subject/create-subject', { name: 'chatTestSub', groupId: groupId }, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }))
        .catch(e => console.log(e.code))
        .finally(() => {
            axios.post('http://localhost:8080/api/group/join', {code: 'TEST123'}, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } })
            .catch(e => console.log(e))
            .finally(() => )
            
        })*/
        
        axios.get("http://localhost:8080/api/users", { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }).then(res => {
                setSender(res.data.id)
                getNewestMessages()
        })
    }, [subject]);

    useEffect(() => {
        const fixedDatesMsgs = messages.map(e => ({...e, date: new Date(e.date)}))
        console.log(fixedDatesMsgs.sort((a, b) => Date.parse(a.date)-Date.parse(b.date)))
        setMessages(fixedDatesMsgs.sort((a, b) => Date.parse(a.date)-Date.parse(b.date)))
    }, [messages?.length])

    const getNewestMessages = () => {
        axios.get(`http://localhost:8080/api/message/?subjectId=${subject.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } })
        .then(resMsg => {
            //setMessages(resMsg.data);
            console.log(resMsg.data)
            axios.get("http://localhost:8080/api/group/user-groups", { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } })
            .then(resGrp => {
                setUserGroups(resGrp.data)
                console.log(resGrp)
                setMessages(resMsg.data.map(m => ({
                    ...m, 
                    sender: resGrp.data.find(g => g.id==groupId).members.find(u => u.id==m.sender).firstname
                            +" "
                            +resGrp.data.find(g => g.id==groupId).members.find(u => u.id==m.sender).lastname
                })))
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    const loadMoreMessages = () => {
        const timestamp = messages[0].date
    }

    const sendMessage = () => {
        client.sendMessage(`/app/${subject.id}`, JSON.stringify({sender: sender, content: message}));
        setMessage('')
    };

    const handleMessage = (msg) => {
        const msgSender = userGroups.find(g => g.id==groupId).members.find(u => u.id==msg.sender)
        if (!msgSender) {
            getNewestMessages()
            return
        }
        setMessages([...messages, {...msg, sender: msgSender.firstname+" "+msgSender.lastname}]);
    };

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return (
          [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      }

    return (
        <>
            {isLogged && (
                <div className="chat-container">
                    <SockJsClient url='http://localhost:8080/ws' 
                     topics={[`/topic/${subject.id}`]} 
                     onMessage={handleMessage}
                     ref={ (c) => { setClient(c) }} 
                    />
                    <div className="messages-container">
                        {messages.map((msg, index) => {
                            return (
                                <div key={index} className="message">
                                    <div>
                                        <span className="message-sender">{msg.sender}</span>
                                        <span> 
                                            { new Date().toDateString()!==new Date(msg.date).toDateString()
                                             ? new Date(msg.date).toLocaleTimeString('pl-PL', dateOptions).slice(0, -3)
                                             : new Date(msg.date).toTimeString().slice(0, 5)
                                            }
                                        </span>
                                    </div>
                                    <div className="message-content">{msg.content}</div>
                                </div>
                            );
                        })}
                    <div ref={messagesEndRef} />
                    </div>
                    <div className="input-container">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={sendMessage}>Wyślij</button>
                    </div>
                </div>)}
            {!isLogged && (
                <div className="container">
                    <h2>Powinieneś się najpierw zalogować lub zarejestrować, nie sądzisz? ;) </h2>
                </div>
            )}
        </>
    );
}

export default Chat;