import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { searchBar as SearchBar } from './searchBar';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {

    const { user } = useContext(UserContext);

    return (
        <div className='nav'>
            {   
                user.id ? 
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
                    <SearchBar />
                </div>
                :
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link> 
                </div>
            }
        </div>
    );
};

export default NavBar;