const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/coursesModel');
const Purchase = require('../models/purchaseModel');
const mongoose = require('mongoose');
const throwCustomError = require('../utils/throwCustomError');

const addPurchase = asyncHandler(async (req, res) => {

    const { userId, courseId } = req.params;

    // const course = await Course.findOne({_id: courseId});
    let purchase;

    if(Purchase.findOne({courseId: courseId})){
        purchase = await Purchase.create({
            courseId: courseId,
            buyers: [
                {userid: userId},
            ],
        });
        // console.log(purchase);
        res.status(201).json(purchase);
    }
    return
    if(purchase.buyers.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()).length <= 0){
        purchase.buyers.push({userId: userId});

        await purchase.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                
                // return
            }
        });
        res.status(201).send(purchase);
        return
    }

    if(purchase.buyers.filter(e => e.userId.toString() == mongoose.Types.ObjectId(userId).toString()).length > 0){
        const like = purchase.buyers.filter(e => e.userId.toString() === mongoose.Types.ObjectId(userId).toString());

        const index = purchase.buyers.indexOf(like[0]);

        purchase.likes.splice(index, 1);

        await purchase.save(function (err) {
            if (err) {
                const error = throwCustomError('Course not found', 400);
                res.status(error.status).json(error);
                // return
            }
        });
        res.status(201).send(purchase);
        return
    }

});

module.exports = {
    addPurchase,

}