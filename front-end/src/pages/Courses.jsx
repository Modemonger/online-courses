import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import axios from 'axios'
import { CourseContext } from '../contexts/CoursesContext';
import submitLike from '../util/submitLike';

export const Courses = () => {
    const { user, setUser } = useContext(UserContext);
    const { courses, setCourses } = useContext(CourseContext);

    useEffect(() => {
        const tmp = JSON.parse(window.localStorage.getItem('user'));
        // console.log(tmp);
        if(tmp != user)
            setUser(tmp);  
        // console.log(user);
    }, [])

    useEffect(() => {
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
    }, [])
    
    const handleLike = async (event, course, index) => {
        // console.log(course);
        let response = await submitLike(event, course, index, user, courses);
        // console.log(response);
        setCourses(response);
    }

  return (
    <div className='courses'>
        <select name="categories" id="categoriesSelector">
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="technology">Technology</option>
            <option value="music">Music</option>
            <option value="sience">Sience</option>
        </select> 
        {
            courses.map((course, index) => {
                return <div key={course._id} className="course">
                            <h3>{course.coursename}</h3>
                            <p>{course.courseDescription}</p>
                            <iframe width="420" height='250' src={course.video}>
                            </iframe>
                            <p className='likes'>
                                {course.likes ? course.likes.length : 0} 
                                {user ? <span><input className='likeButton' type="button" name='like' value="<3" onClick={event => handleLike(event, course, index)} /></span> : ''}
                            </p>
                        </div>
            })
        }
    </div>
  )
}