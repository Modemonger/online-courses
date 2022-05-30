import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const HomePage = () => {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const tmp = JSON.parse(window.localStorage.getItem('user'));
    // console.log(tmp);
    if(tmp)
      setUser(tmp);
  }, [])
  
  return (
    <div className='homepage'>
        <div className="recomended">
            recomended { user.id ? 'for ' + user.username : null  }
        </div>
        <div className="stats">
            stats
        </div>
    </div>
  )
}
