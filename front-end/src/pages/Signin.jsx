import React from 'react'

const handleSubmit = (event) => {
    event.preventDefault();
}

export const Signin = () => {
  return (
    <div className='signinPage'>
        <div className="signinCard">
            <form className='signinForm' onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type={'text'} name="username" id="username" />
                </label>
                
                <label>
                    Password:
                    <input type={'password'} name="password" id="password" />
                </label>
                
                <input type={'submit'} value="SIGNIN" onClick={
                    (event) => {
                        event.preventDefault();
                        console.log('signin');
                    }} />
            </form>
        </div>
    </div>
  )
}
