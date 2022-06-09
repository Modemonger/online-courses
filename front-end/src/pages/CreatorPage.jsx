import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import CourseForm from '../components/courseForm';
import { CourseContext } from '../contexts/CoursesContext';
import { UserContext } from '../contexts/UserContext';
import submitLike from '../util/submitLike';
import deleteCourse from '../util/deleteCourse';
import { compareRecent } from '../util/compare';

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

  courses.sort(compareRecent);

  
  const handleLike = async (event, course, index) => {
    // console.log(course);
    let response = await submitLike(event, course, index, user, courses);
    // console.log(response);
    setCourses(response);
  }

  const handledelete = async (event, course, index) => {
    let response = await deleteCourse(event, course, index, user, courses);
    // console.log(response);
    setCourses(response);
  }

  return (
    <div className='creatorPage'>
      <CourseForm></CourseForm>
      <div className="courses">
        {
            courses.map ? courses.map((course, index) => {
                return <div key={course._id} className="course">
                          <h3>{course.coursename}</h3>
                          {course.owner === user.id 
                            ? 
                            <input className='delete' type="button" name='delete' value="X" onClick={event => handledelete(event, course, index)} />
                            :
                            ''
                          }
                          <p>{course.courseDescription}</p>
                          <iframe width="420" height='250' src={course.video}>
                          </iframe>
                          <p className='likes'>
                              {course.likes ? course.likes.length : 0} 
                              <span><input className='likeButton' type="button" name='like' value="<3" onClick={event => handleLike(event, course, index)} /></span>
                          </p>
                      </div>
            }) : 'Loading...'
        }
      </div>
    </div>
  )
}

export default CreatorPage