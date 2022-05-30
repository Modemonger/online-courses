import { UserProvider } from './contexts/UserContext';
import NavBar from './components/navBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { HomePage } from './pages/HomePage';
import { useEffect } from 'react';
function App() {
  return (
    <UserProvider>
        
        <Router>
          <NavBar />
          <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Signin />} />
              <Route path='/' element={<HomePage />} />
          </Routes>
        </Router>
    </UserProvider>
  );
}

export default App;