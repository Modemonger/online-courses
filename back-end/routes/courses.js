const express = require("express");
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourse,
    getUserCourses,
    deleteCourse,

} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-course", createCourse);

router.get('/get-courses', getCourses);

router.get('/get-course/:id', getCourse);

router.get('/get-user-courses/:id', getUserCourses);

router.delete('/delete-course/:id', deleteCourse);

module.exports = router;