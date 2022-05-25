const jwt = require("jsonwebtoken");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const throwCustomError = require("../utils/throwCustomError");
// const { deleteUser } = require("../services/usersServices");

// function to create a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

function checkPwd(str) {
  if (str.length < 6) {
    throw throwCustomError("Password is too short", 400);
  } else if (str.length > 24) {
    throw throwCustomError("Password is too long", 400);
  } else if (str.search(/\d/) == -1) {
    throw throwCustomError("Password must contain a number", 400);
  } else if (str.search(/[a-zA-Z]/) == -1) {
    throw throwCustomError("Password must contain letters", 400);
  } else if (str.search(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) == -1) {
    throw throwCustomError("Password must contain at least one symbol", 400);
  }
  return(0);
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw throwCustomError("Please add all fields", 400);
  }

  checkPwd(password);

  const userExists = await User.findOne({ email: email });

  const userNameTaken = await User.findOne({ name: username });

  if (userExists) {
    res.status(400);
    throw throwCustomError("Email already exists", 400);
  } else if (userNameTaken) {
    res.status(400);
    throw throwCustomError("Username is taken", 400);
  }

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");

  const user = await User.create({
    username,
    email,
    password: `${salt}:${hashedPassword}`,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      responseBody:{
        message: "User registered",
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw throwCustomError("Invalid user data", 400);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const [salt, key] = user.password.split(":");
    const hashedByffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedByffer, keyBuffer);

    if (match) {
      res.status(201).json({
        status: "success",
        responseBody:{
          message: "User loged in",
          id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw throwCustomError("User was not found", 400);
    }
  } else {
    res.status(400);
    const error = new Error("User was not found");
    error.statusCode = 400;
    throw error;
  }
});

const getUser = asyncHandler(async (req, res) => {
  // did this because mongoose expects an object
  // and this lets us see more possible errors like invalid id lenghts
  const userId = mongoose.Types.ObjectId(req.user.decodedId);
  const decodedUsersIdFromJwt = req.user.decodedId;

  if (!userId) {
    throw throwCustomError("Please provide userID", 400);
  }

  if (getReqId(req) !== decodedUsersIdFromJwt) {
    throw throwCustomError("You're trying to get a different user!", 400);
  }
  // finds user by id
  const user = await User.findById(userId);

  if (user) {
    res.status(200).json({
      status: "success",
      responseBody:{
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    throw throwCustomError("User not found", 400);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  // get the user we will be updating
  const userId = mongoose.Types.ObjectId(req.user.decodedId);
  console.log(req.user.decodedId, userId);
  const decodedUsersIdFromJwt = req.user.decodedId;

  if (!userId) {
    throw throwCustomError("Please provide userID", 400);
  }

  if (getReqId(req) !== decodedUsersIdFromJwt) {
    throw throwCustomError("You're trying to upadte a different user!", 400);
  }

  const { username, email, password } = req.body;
  if(!username && !email && !password) throw throwCustomError('Nothing to update', 400);
  
  // we update the user based on what information we get
  if (password) {
    // make sure the password is right
    checkPwd(password);
    // password needs to be hashed again
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");
    await User.findByIdAndUpdate(userId, { password: `${salt}:${hashedPassword}` });
  }
  if (username) {
    const userNameTaken = await User.findOne({ username: username });
    // simply change the name if thats requested
    if(!userNameTaken)
      await User.findByIdAndUpdate(userId, { username: username });
    else throw throwCustomError("User name is taken", 400);
  }
  if (email) {
    const user = await User.findOne({ email: email });
    // change email
    if(!user)
      await User.findByIdAndUpdate(userId, { email: email });
    else throw throwCustomError("Email is in use", 400);
  }
  // get updated user
  const updatedUser = await User.findById(userId);
  // show updated user data
  res.status(200).json({
    status: "success",
    responseBody:{
      message: "User data updated at user id",
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    },
  });
});

const deleteUserHandler = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const decodedUsersIdFromJwt = req.user.decodedId;

  if (!userId) {
    throw throwCustomError("Please provide userID", 400);
  }

  if (userId !== decodedUsersIdFromJwt) {
    throw throwCustomError("You're trying to delete other user!", 400);
  }

//   const deletedUser = await deleteUser(userId);

//   res.json({
//     status: "success",
//     responseBody:{
//       message: "User data deleted at user id",
//       id: deletedUser._id,
//       username: deletedUser.username,
//       email: deletedUser.email,
//     },
//   });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUserHandler,
};