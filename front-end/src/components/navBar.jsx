import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SearchBar } from './searchBar';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {

    const { user, setUser } = useContext(UserContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        setStatus(user.status);
                 
    }, [user])

    const handleSingout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        const storage = JSON.parse(window.localStorage.getItem('user'));
        setUser({});
    }

    switch (status) {
        case 'Learner':
            return(
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
                    <Link to='/' onClick={handleSingout}>Singout</Link>
                    <SearchBar />
                </div>
            );
            break;
        case 'Lecturer':
            return(
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
                    <Link to='/'>Singout</Link>
                    <SearchBar />
                </div>
            );
            break;
    
        default:
            return(
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link> 
                </div>
            );
            break;
    }
};

export default NavBar;