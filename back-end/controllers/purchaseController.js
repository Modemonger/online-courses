const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/coursesModel');
const User = require('../models/userModel');
const Purchase = require('../models/purchaseModel');
const mongoose = require('mongoose');
const throwCustomError = require('../utils/throwCustomError');

const addPurchase = asyncHandler(async (req, res) => {

    const { userId, courseId } = req.params;

    const course = await Course.findOne({_id: courseId});
    let purchase = await Purchase.findOne({courseId: courseId});

    if(!purchase.id){
        purchase = Purchase.create({
            courseId: courseId,
            buyers: [
                userId,
            ],
        })
    }

    let response;

    if(course.likes.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()).length <= 0){
        course.likes.push({userId: userId});

        await course.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                response = error;
                
                // return
            }
        });
        // response = course;
        // console.log('add', course.likes.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()));
        res.status(201).send(course);
        return
    }

    if(course.likes.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()).length > 0){
        const like = course.likes.filter(e => e.userId.toString() === mongoose.Types.ObjectId(userId).toString());

        const index = course.likes.indexOf(like[0]);

        course.likes.splice(index, 1);
        // console.log(index, course);
        await course.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                response = error;
                // return
            }
        });
        // response = course;
        // console.log('remove', course.likes.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()));
        res.status(201).send(course);
        return
    }

});