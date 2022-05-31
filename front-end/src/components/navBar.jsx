import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SearchBar } from './searchBar';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {

    const { user, setUser } = useContext(UserContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const tmp = JSON.parse(window.localStorage.getItem('user'));
        // console.log(tmp);
        if(tmp){
            setUser(tmp);
            setStatus(tmp.status);
        }
          
    }, [])

    switch (status) {
        case 'Learner':
            return(
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
                    <SearchBar />
                </div>
            );
            break;
        case 'Lecturer':
            return(
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/courses'>Courses</Link>
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