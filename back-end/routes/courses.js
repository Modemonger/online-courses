const express = require("express");
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourse,
    getUserCourses,
    deleteCourse,
    addLike,
    getRecent,
    getPopular,

} = require("../controllers/courseController");
const { 
    middleware
} = require("../middleware/authMiddleware");

router.post("/create-course", middleware.creatorAuthentication || middleware.adminAuthentication, createCourse);

router.get('/get-courses', getCourses);

router.get('/get-recent-courses', getRecent);

router.get('/get-popular-courses', getPopular);

router.get('/get-course/:id', getCourse);

router.get('/get-user-courses/:id', middleware.creatorAuthentication || middleware.adminAuthentication, getUserCourses);

router.delete('/delete-course/:id', middleware.creatorAuthentication || middleware.adminAuthentication, deleteCourse);

router.post('/like/:userId/:courseId', middleware.userAuthentication || middleware.creatorAuthentication || middleware.adminAuthentication, addLike);

module.exports = router;