const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
});

const courseSchema = mongoose.Schema(
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    coursename: {
      type: String,
      required: [true, "Please give a name"],
    },
    courseDescription: {
        type: String,
    },
    video: {
        type: String,
        required: [true, 'Please provide a video'],
    },
    createdAt: { type: Date, default: Date.now },
    likes: [likesSchema],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("course", courseSchema);