import React from 'react'

const handleSubmit = (event) => {
    event.preventDefault();
    
}

export const Signup = () => {
  return (
    <div className='signupPage'>
        <div className="signupCard">
            <form className='signupForm' onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type={'text'} name="username" id="username" />
                </label>

                <label>
                    Email:
                    <input type={'email'} name="email" id="email" />
                </label>
                
                <label>
                    Password:
                    <input type={'password'} name="password" id="password" />
                </label>
                
                <label>
                    Confirm password:
                    <input type={'password'} name="confirmPassword" id="confirmPassword" />
                </label>

                <label>
                    I am a:
                    <div>
                        <input type="radio" name="status" id="learner" value='Learner' /> Learner
                        <input type="radio" name="status" id="lecturer" value='Lecturer' /> Lecturer
                    </div>
                    
                </label>
                
                <input type={'submit'} value="SIGNUP" onClick={
                    (event) => {
                        event.preventDefault();
                        console.log('signup');
                    }}/>
            </form>
        </div>
    </div>
  )
}
