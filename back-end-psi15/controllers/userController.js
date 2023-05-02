import bcrypt from 'bcrypt';
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

  // Create Author object with escaped and trimmed data
    const user = new User(req.body);
    await user.save()
    .exec()
    .then(user => {
      res.status(200).json("Added successfully!")
    })
    .catch(err => {
      res.send("Error")
    });
  });


// Display detail page for a specific User. Returns a user or null if user does not exist.
exports.user_detail = asyncHandler(async (req, res, next) => {
    try {
      const userInstance = await User.findOne({ username: req.params.username}).exec();
      res.json(userInstance);
    } catch(error) {
      console.error(error);
    }
// Update existing User. Saldo e lista de jogos não alterados nesta função pq vão ter funções especificas.
exports.user_update_post = asyncHandler(async (req, res, next) => {

  const userInstance = await User.findOne({ username: req.body.username}).exec();
  if(!userInstance) 
    return next(new Error('Could not find user.'))
  else {
    userInstance.username = req.body.username;
    userInstance.password = req.body.password;
    await userInstance.save()
    .exec()
    .then(userInstance => {
      res.json("Updated successfully!")
    })
    .catch(err => {
      res.send("Error")
    });
  }
});

// Deleted existing user. Returns a error if no user found.
exports.user_delete_get = asyncHandler(async (req, res, next) => {

  const userInstance = await User.findOneAndRemove({ username: req.params.username}).exec();
  if(!userInstance) 
    return next(new Error('Could not find user.'))
  else {
    res.json("Deleted successfully!")
  }

});
});

