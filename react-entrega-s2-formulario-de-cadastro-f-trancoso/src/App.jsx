import './App.css';
import {ReactComponent as Logo} from './logo.svg'
import {LoginPage} from './pages/LoginPage/index.jsx'
import {SignUpPage} from './pages/SignUpPage/index.jsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { UserContext } from './contexts/UserContext'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const [currentUser, setCurrentUser] = useState(undefined)

  const validateUser = async () => {

    const currentToken = JSON.parse(localStorage.getItem('currentUser'))['token']

    const userProfile = await axios.get('https://kenziehub.herokuapp.com/profile', {headers: {'Authorization': `Bearer ${currentToken}`}})

    setCurrentUser(userProfile.data)
  }

  useEffect(() => {
    validateUser()
      .catch((err) => {
        console.error(err)
        localStorage.clear('currentUser')
      })
  }, [])

  return (
      <div className="App">
        <UserContext.Provider value={ { currentUser, setCurrentUser, validateUser } }>
          <header>
            <Logo />
          </header>
          <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<SignUpPage />} />
            {currentUser && <Route path='/' element={<HomePage />}/>}
          </Routes>
        </UserContext.Provider>
        
      </div>
  );
}

export default App;
