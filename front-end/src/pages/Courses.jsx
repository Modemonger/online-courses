import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import axios from 'axios'
import { CourseContext } from '../contexts/CoursesContext';

export const Courses = () => {
    const { user, setUser } = useContext(UserContext);
    const { courses, setCourses } = useContext(CourseContext);

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
    <div>
        {
            courses.map((course, index) => {
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
  )
}