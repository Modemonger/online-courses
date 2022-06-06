import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import CourseForm from '../components/courseForm';
import { CourseContext } from '../contexts/CoursesContext';
import { UserContext } from '../contexts/UserContext';
import submitLike from '../util/submitLike';

const CreatorPage = () => {
  const {courses, setCourses} = useContext(CourseContext);
  const {user, setUser} = useContext(UserContext);

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

  return (
    <div className='creatorPage'>
      <CourseForm></CourseForm>
      <div className="courses">
        {
            courses ? courses.map((course, index) => {
                return <div key={course._id} className="course">
                    <h3>{course.coursename}</h3>
                    <p>{course.courseDescription}</p>
                    <iframe width="420" height='250' src={course.video}>
                    </iframe>
                    <p>
                        {course.likes.length} 
                        <span><input type="button" name='like' value="<3" onClick={event => setCourses(submitLike(event, course, index, user, courses))} /></span>
                    </p>
                </div>
            }) : 'b '
        }
      </div>
    </div>
  )
}

export default CreatorPage