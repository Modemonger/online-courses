import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
const UserPage = () => {
    const { user, setUser } = useContext(UserContext);

    const [recent, setRecent] = useState([]);

    useEffect(() => {
        const tmp = JSON.parse(window.localStorage.getItem('user'));
        // console.log(tmp);
        if(tmp)
        setUser(tmp);

        let config = {
            method: 'get',
            url: 'http://localhost:3001/api/courses/get-recent-courses',
        };
            
        axios(config)
        .then(function (response) {
            // console.log(response.data);
            setRecent(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])
    

    const submitLike = (event, course, index) => {
        event.preventDefault();
        // console.log(user.id, course);
        let config = {
            method: 'post',
            url: `http://localhost:3001/api/courses/like/${user.id}/${course._id}`,
        };
          
        axios(config)
        .then(function (response) {
            // console.log(response.data);
            let newArr = [...recent];
            newArr[index] = response.data;
            setRecent(newArr);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
      <div className='homepage'>
          <div className="popular">
              <h2>Popular</h2>
          </div>
          <div className="recent">
            <h2>Recent</h2>
            {
                recent.map((course, index) => {
                    return <div key={course._id} className="course">
                        <h3>{course.coursename}</h3>
                        <p>{course.courseDescription}</p>
                        <iframe width="420" height='250' src={course.video}>
                        </iframe>
                        <p>
                            {course.likes.length} 
                            <span><input type="button" name='like' value="<3" onClick={event => submitLike(event, course, index)} /></span>
                        </p>
                    </div>
                })
            }
          </div>
      </div>
    )
}

export default UserPage