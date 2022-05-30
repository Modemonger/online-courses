import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useState } from 'react';

export const Signup = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        status: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);

        if(user.password === user.confirmPassword){
            var data = qs.stringify({
                'username': user.username,
                'email': user.email,
                'password': user.password,
                'status': user.status,
            });
            var config = {
                method: 'post',
                url: 'http://localhost:3001/api/users/register',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data,
            };
            
            axios(config)
            .then(function (response) {
                console.log(response.data);
                window.localStorage.setItem('user', JSON.stringify(response.data.responseBody));
            })
            .catch(function (error) {
                console.log(error);
            });
            return 
        }
        setUser({
            ...user,
            password: '',
            confirmPassword: '',
        })
        throw new Error('passwords dont match, try again');
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUser({
            ...user,
            [name]: value
        });
    }

  return (
    <div className='signupPage'>
        <div className='signupCard'>
            <form className='signupForm' onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type={'text'} name='username' id='username' value={user.username} onChange={handleChange} />
                </label>

                <label>
                    Email:
                    <input type={'email'} name='email' id='email' value={user.email} onChange={handleChange} />
                </label>
                
                <label>
                    Password:
                    <input type={'password'} name='password' id='password' value={user.password} onChange={handleChange} />
                </label>
                
                <label>
                    Confirm password:
                    <input type={'password'} name='confirmPassword' id='confirmPassword' value={user.confirmPassword} onChange={handleChange} />
                </label>

                <label>
                    I am a:
                    <div onChange={handleChange}>
                        Learner<input type='radio' name='status' id='learner' value='Learner' />
                        Lecturer<input type='radio' name='status' id='lecturer' value='Lecturer' />
                    </div>
                    
                </label>
                
                <input type={'submit'} value='SIGNUP'/>
            </form>
        </div>
    </div>
  )
}
