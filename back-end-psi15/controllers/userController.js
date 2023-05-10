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
exports.user_create_post = [

  body("username")
  .trim()
  .isLength({ min: 3})
  .withMessage("Username must be at least 3 characters")
  .isAlphanumeric()
  .withMessage("Username must be alphanumeric characters")
  .escape()
  .withMessage("Username must be specified."),

  body("password")
  .trim()
  .isLength({ min: 8})
  .withMessage("Password must be at least 8 characters")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
  .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),

  asyncHandler(async (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);
    
    // Create Author object with escaped and trimmed data
    var user = new User(req.body);

    if (!errors.isEmpty()) {

      // There are errors.
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(422).json({ errors: errorMessages });

    } else {
      // Data from form is valid.

      // Save user.
      await user.save()
      .then(user => {
        res.status(200).json("Added successfully!");
      })
      .catch(err => {
        res.status(500).send('Failed to create new user');
      });
    }
    
  })
  ];


// Display detail page for a specific User. Returns a user or null if user does not exist.
exports.user_detail = asyncHandler(async (req, res, next) => {
    try {
      const userInstance = await User.findOne({ username: req.params.username}).exec();
      res.json(userInstance);
    } catch(error) {
      console.error(error);
    }
});

// Update existing User. Saldo e lista de jogos não alterados nesta função pq vão ter funções especificas.
exports.user_update_post = asyncHandler(async (req, res, next) => {

  
  const userInstance = await User.findOne({ username: req.body.username}).exec();
  if(!userInstance) 
    return next(new Error('Could not find user.'))
  else {
    userInstance.username = req.body.username;
    userInstance.password = req.body.password;
    userInstance.image = req.body.image;
    await userInstance.save()
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

exports.user_cart_get = asyncHandler(async (req, res, next) => {

  const userInstance = await User.findOne({ username: req.params.username}).exec();
  if(!userInstance) 
    return res.status(400).send("User does not exist!")
  else {
    
    const cartItems = userInstance.cart;
    res.status(200).send(cartItems);
  }

});

exports.user_cart_delete = asyncHandler(async (req, res, next) => {

  const userInstance = await User.findOne({ username: req.params.username}).exec();
  if(!userInstance) 
    return res.status(400).send("User does not exist!")
  else {
    
    const cartItem = req.body.item;
    if(userInstance.cart.has(cartItem)) {
      var copies = userInstance.cart.get(cartItem);
      userInstance.cart.set(cartItem, copies - 1);
      await userInstance.save().exec();
      res.status(200).send('Item removed successfully');
    } else {
      return res.status(400).send("Item does not exist!")
    }
  }

});