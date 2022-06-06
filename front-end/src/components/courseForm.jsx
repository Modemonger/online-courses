import axios from 'axios'
import qs from 'qs'
import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

const CourseForm = () => {

    const { user } = useContext(UserContext);

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
          console.log(config);
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
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
            <input type="text" name="coursename" id="coursename" value={courseForm ? courseForm.coursename : ''} onChange={handleChange} />
            <textarea name="courseDescription" id="description" cols="30" rows="10" value={courseForm ? courseForm.courseDescription : ''} onChange={handleChange}>

            </textarea>
            <input type="url" name="video" id="video" value={courseForm ? courseForm.video : ''} onChange={handleChange}/>
            <input type="submit" value="Create" />
        </form>
    )
}

export default CourseForm