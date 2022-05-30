const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/coursesModel');
const mongoose = require('mongoose');
const throwCustomError = require('../utils/throwCustomError');
require('dotenv').config({ path: __dirname + '/../.env' });

const createCourse = asyncHandler(async (req, res) => {
    const { owner, coursename, courseDescription, video } = req.body;
    
    const courseExists = await Course.findOne({ video: video });

    if(courseExists){
        const error = throwCustomError("Course already exists", 400);
        res.status(error.status).json(error);
        return
    }

    const course = await Course.create({
        owner: owner,
        coursename: coursename,
        courseDescription: courseDescription,
        video: video,
    });

    if (course) {
        res.status(201).json({
            status: "success",
            message: "Course created",
            responseBody:{
            id: course._id,
            owner: course.owner,
            coursename: course.coursename,
            courseDescription: course.courseDescription,
            video: course.video,
            },
        });
    } else {
        const error = throwCustomError("Invalid course data", 400);
        res.status(error.status).json(error);
    }

});

const getCourses = asyncHandler(async (req, res) => {

    const courses = await Course.find({}, '-__v');
  
    if (courses) {
      res.status(201).send(courses);
    } else {
        const error = throwCustomError('Course not found', 400);
        res.status(error.status).json(error);
    }

});

const getCourse = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const courses = await Course.find({_id: id}, '-__v');
  
    if (courses) {
      res.status(201).send(courses);
    } else {
        const error = throwCustomError('Courses not found', 400);
        res.status(error.status).json(error);
    }

});

const getUserCourses = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const courses = await Course.find({owner: id}, '-__v');
  
    if (courses) {
      res.status(201).send(courses);
    } else {
        const error = throwCustomError('Course not found', 400);
        res.status(error.status).json(error);
    }

});

const deleteCourse = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const courseDelete = await Course.findByIdAndDelete(id);

    res.status(201).send(courseDelete);

});

const addLike = asyncHandler(async (req, res) => {

    const { userId, courseId } = req.params;

    const course = await Course.findOne({_id: courseId}, '-__v');

    if(!course.likes.filter(e => e.userId.toString() === mongoose.Types.ObjectId(userId).toString()).length > 0){
        course.likes.push({userId: userId});
        await course.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                return
            }
        });

        res.status(201).send(course);
        return
    }
    
    if(course.likes.filter(e => e.userId.toString() === mongoose.Types.ObjectId(userId).toString()).length > 0){
        const like = course.likes.filter(e => e.userId.toString() === mongoose.Types.ObjectId(userId).toString());

        const index = course.likes.indexOf(like[0]);

        course.likes.splice(index, 1);
        await course.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                return
            }
        });

        res.status(201).send(course);
        return
    }
    
    const error = throwCustomError('Encountered an issue', 400);
    res.status(error.status).json(error);

});

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getUserCourses,
    deleteCourse,
    addLike,
}