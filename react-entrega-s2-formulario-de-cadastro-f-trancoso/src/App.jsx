import './App.css';
import {ReactComponent as Logo} from './logo.svg'
import {LoginPage} from './pages/LoginPage/index'
import {SignUpPage} from './pages/SignUpPage/index'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';

function App() {

  return (
      <div className="App">
          <header>
            <Logo />
          </header>
          <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<SignUpPage />} />
            <Route path='/' element={<HomePage />}/>
          </Routes>
      </div>
  );
}

export default App;
