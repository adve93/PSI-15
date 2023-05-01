const User = require("../models/user");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all User.
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = User.find({}, "username")
    .exec();

    res.send(allUsers);
});

// Display detail page for a specific Client.
exports.user_detail = asyncHandler(async (req, res, next) => {

    const userInstance = User.find({ username: req.params.id}).exec();

    if (clientInstance === null) {
        // No results.
        const err = new Error("Client not found");
        err.status = 404;
        return res.status(404).send('Client not found');
      }

    res.json(userInstance);

});


// Post new User.
exports.user_create_post = [
    
    body("username")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .isAlphanumeric(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .escape(),
    
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {

      const errors = validationResult(req);
      // Extract the validation errors from a request.
  
      // Create Author object with escaped and trimmed data
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });

      if (!errors.isEmpty()) {
        return;
      }
        await author.save();
      }
    ),
  ];
  



