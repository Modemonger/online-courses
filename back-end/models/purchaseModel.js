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
      required: [true, 'Please provide course id'],
      ref: "course",
    },
    buyers: [buyerSchema],
});

module.exports = mongoose.model("Purchase", buyerSchema);