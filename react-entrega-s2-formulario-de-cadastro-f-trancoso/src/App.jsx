import './App.css';
import {ReactComponent as Logo} from './logo.svg'
import {LoginPage} from './components/LoginPage/index.jsx'
import {SignUpPage} from './components/SignUpPage/index.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './components/HomePage';

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <Logo />
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
