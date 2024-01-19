import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSync } from 'react-icons/fa';
import { setUserGroups as refreshGroups, setGroup, setSubject } from '../Store/actions';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  // Lista grup użytkownika

  // GET / api / group / user - groups

  // Wymaga access token jako bearer token.

  // Zwraca listę grup, do których należy użytkownik.

  const flag = useSelector((state) => state.flag);
  const groupId = useSelector((state) => state.groupId);
  const subjectId = useSelector((state) => state.subjectId);

  const [userGroups, setUserGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectName, setSubjectName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(localStorage.getItem('access_token'))
    axios
      .get('http://localhost:8080/api/group/user-groups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserGroups(res.data);
      })
      .catch((err) => {
        /*axios.post('http://localhost:8080/api/auth/refresh-token', {}, { headers: {
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
        }}).then(res => {
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          handleRefresh()
        })*/
      });
  }, [flag]);

  useEffect(() => {
    handleRefresh()
  }, [])

  useEffect(() => {
    if (groupId) {
      axios
        .get(`http://localhost:8080/api/subject/get-subjects?groupId=${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setSubjects(res.data);
          setShowSubjectForm(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [groupId]);

  const handleRefresh = () => {
    dispatch(refreshGroups());
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if (subjectName) {
      axios
        .post(`http://localhost:8080/api/subject/create-subject`, {
          groupId: groupId,
          name: subjectName
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          setShowSubjectForm(false)
          setSubjectName('')
          console.log(res.data)
          Promise.resolve(dispatch(setGroup(null))).then(() => dispatch(setGroup(groupId)));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="sidebar">
      <>
        <div className="group-list">
          <h2>Twoje grupy</h2>
          <button onClick={handleRefresh} className="refresh-button">
              <FaSync />
            </button>
          <ul>
            {userGroups.map((group, index) => (
              <li className="sidebar-group" onClick={() => dispatch(setGroup(group.id))} key={index}>
                <div className='group-name'>{group.name}</div>
                {groupId===group.id && 
                <><ul>
                  {subjects.map((sub, index) => (
                    <li onClick={() => dispatch(setSubject(sub.id))} key={index}>
                      <Link to="/czat" >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div>
                  {!showSubjectForm ? 
                    <button onClick={() => setShowSubjectForm(true)}>+</button> :
                    <form onSubmit={(e) => handleSubjectSubmit(e)}>
                      <label>
                          <input type="text" placeholder='Nazwa przedmiotu' name="subjectName" onChange={e => setSubjectName(e.target.value)} />
                      </label>
                      <input type="submit" value="Stwórz" />
                      <button onClick={() => setShowSubjectForm(false)}>Anuluj</button>
                    </form>
                  }
                </div></>}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/create-group" className="sidebar-button">
          Utwórz grupę
        </Link>
        <Link to="/join-group" className="sidebar-button">
          Dołącz do grupy
        </Link>
      </>
    </div>
  );
};

export default Sidebar;
