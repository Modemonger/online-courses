import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useState } from 'react';

export const Signin = () => {

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);

        var data = qs.stringify({
            'username': user.username,
            'password': user.password, 
        });
        var config = {
            method: 'post',
            url: 'http://localhost:3001/api/users/login',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
            
        axios(config)
        .then(function (response) {
            console.log(response.data.responseBody);
            window.localStorage.setItem('user', JSON.stringify(response.data.responseBody));
        })
        .catch(function (error) {
            console.log(error);
            setUser({
                ...user,
                password: '',
            });
        });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUser({
            ...user,
            [name]: value
        });
    }

  return (
    <div className='signinPage'>
        <div className="signinCard">
            <form className='signinForm' onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type={'text'} name="username" id="username" value={user.username} onChange={handleChange}/>
                </label>
                
                <label>
                    Password:
                    <input type={'password'} name="password" id="password" value={user.password} onChange={handleChange}/>
                </label>
                
                <input type={'submit'} value="SIGNIN" />
            </form>
        </div>
    </div>
  )
}
