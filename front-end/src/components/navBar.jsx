import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Signin } from '../pages/Signin';
import { HomePage } from '../pages/HomePage';
import { searchBar as SearchBar } from './searchBar';

const NavBar = () => {
  return (
        <div className='nav'>
            <Router>
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link> 
                    <SearchBar />
                </div>
                
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Signin />} />
                    <Route path='/' element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default NavBar;