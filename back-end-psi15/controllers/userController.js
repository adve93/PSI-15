const User = require("../models/user");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all User.
exports.user_list = asyncHandler(async (req, res, next) => {
    try {
      const allUsers = await User.find({}, "username").exec();
      res.send(allUsers);
    } catch(error) {
      console.error(error);
    }
    
});

// Post new User.
exports.user_create_post = asyncHandler(async (req, res, next) => {
      
  res.send("Hello")
  // Create Author object with escaped and trimmed data
    const user = new User(req.body);
    await user.save().exec()
    .catch(err => {
      res.send("Error")
    });
    res.send("Created the user")
  });


// Display detail page for a specific User. Returns a user or null if user does not exist.
exports.user_detail = asyncHandler(async (req, res, next) => {
    try {
      const userInstance = await User.findOne({ username: req.params.username}).exec();
      res.json(userInstance);
    } catch(error) {
      console.error(error);
    }
    

});






