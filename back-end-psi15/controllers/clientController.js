const Client = require("../models/client");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all Clients.
exports.client_list = asyncHandler(async (req, res, next) => {
    const allClients = await Client.find({}, "username games")
    .populate("username")
    .exec();

    res.send(allClients);
});

// Display detail page for a specific Client.
exports.client_detail = asyncHandler(async (req, res, next) => {

    const clientInstance = await Client.findById(req.params.id)
    .populate("username")
    .exec();

    if (clientInstance === null) {
        // No results.
        const err = new Error("Client not found");
        err.status = 404;
        return res.status(404).send('Client not found');
      }

    res.send(clientInstance);

});


// Post new Client.
exports.client_create_post = [
    
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
      const client = new Client({
        username: req.body.username,
        password: req.body.password,
      });

      if (!errors.isEmpty()) {
        return;
      }
        await author.save();
        //res.redirect("/client");
      }
    ),
  ];
  



