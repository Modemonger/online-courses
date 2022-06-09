import axios from 'axios'
import qs from 'qs'
import React, { useContext, useState } from 'react'
import { CourseContext } from '../contexts/CoursesContext'
import { UserContext } from '../contexts/UserContext'

const CourseForm = () => {

    const { user } = useContext(UserContext);
    const {courses, setCourses} = useContext(CourseContext);

    const [courseForm, setCourseForm] = useState({

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = qs.stringify({
            'owner': user.id,
            'coursename': courseForm.coursename,
            'courseDescription': courseForm.courseDescription,
            'video': courseForm.video,
          });
          var config = {
            method: 'post',
            url: 'http://localhost:3001/api/courses/create-course',
            data : data
          };
          // console.log(config);
          axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            let newArr = [...courses];
            newArr.unshift(response.data.responseBody);
            setCourses(newArr);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setCourseForm({
            ...courseForm,
            [name]: value
        });
        // console.log(user);
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
          <label>
            Course name:
            <input type="text" name="coursename" id="coursename" value={courseForm.coursename ? courseForm.coursename : ''} onChange={handleChange} />
          </label>
          <label>
            Course description:
            <textarea name="courseDescription" id="description" cols="30" rows="10" value={courseForm.courseDescription ? courseForm.courseDescription : ''} onChange={handleChange}></textarea>
          </label>

          <label>
            Video:
            <input type="url" name="video" id="video" value={courseForm.video ? courseForm.video : ''} onChange={handleChange}/>
          </label>
            
            <input className='submit' type="submit" value="Create" />
        </form>
    )
}

export default CourseForm