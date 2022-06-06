import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { CourseContext } from '../contexts/CoursesContext';

function compareRecent( a, b ) {
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    return 0;
  }

  function compareLikes( a, b ) {
    if ( a.likes.length < b.likes.length ){
      return 1;
    }
    if ( a.likes.length > b.likes.length ){
      return -1;
    }
    return 0;
  }

const UserPage = () => {
    const { user, setUser } = useContext(UserContext);
    const { courses, setCourses } = useContext(CourseContext);

    const [recent, setRecent] = useState([]);
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const tmp = JSON.parse(window.localStorage.getItem('user'));
        // console.log(tmp);
        if(tmp != user)
            setUser(tmp);

        let config = {
            method: 'get',
            url: 'http://localhost:3001/api/courses/get-courses',
        };
        
        axios(config)
        .then(function (response) {
            // console.log(response.data);
            setCourses(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    useEffect(() => {
        setRecent(courses.sort(compareRecent));
        setPopular(courses.sort(compareLikes));
    }, [courses])
    
    

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
            let newArr = [...courses];
            newArr[index] = response.data;
            setCourses(newArr);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
      <div className='homepage'>
          <div className="popular">
              <h2>Popular</h2>
              {
                popular.map((course, index) => {
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