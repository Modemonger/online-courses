const mongoose = require("mongoose");

const buyerSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
});

const PusrchaseShema = mongoose.Schema({
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    buyers: [buyerSchema],
});