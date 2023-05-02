const Item = require("../models/item");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all item.
exports.item_list = asyncHandler(async (req, res, next) => {
    try {
      const allItems = await Item.find({}, "title").exec();
      res.send(allItems);
    } catch(error) {
      console.error(error);
    }
    
});

// Post new item.
exports.item_create_post = asyncHandler(async (req, res, next) => {

    const item = new Item(req.body);
    await item.save()
    .exec()
    .then(item => {
      res.status(200).json("Added successfully!")
    })
    .catch(item => {
      res.send("Error")
    });
  });


// Display detail page for a specific Item. Returns a item or null if item does not exist.
exports.item_detail = asyncHandler(async (req, res, next) => {
    try {
      const itemInstance = await Item.findOne({ title: req.params.tile}).exec();
      res.json(itemInstance);
    } catch(error) {
      console.error(error);
    }
});

// Update existing item.
exports.item_update_post = asyncHandler(async (req, res, next) => {

  const itemInstance = await Item.findOne({ title: req.body.title}).exec();
  if(!itemInstance) 
    return next(new Error('Could not find user.'))
  else {
    itemInstance.title = req.body.title;
    itemInstance.type = req.body.type;
    itemInstance.description = req.body.description;
    itemInstance.platform = req.body.platform;
    itemInstance.languages = req.body.languages;
    itemInstance.price = req.body.price;
    itemInstance.classification = req.body.classification;
    await itemInstance.save()
    .exec()
    .then(itemInstance => {
      res.json("Updated successfully!")
    })
    .catch(err => {
      res.send("Error")
    });
  }
});

// Deleted existing item. Returns a error if no item found.
exports.item_delete_get = asyncHandler(async (req, res, next) => {

  const itemInstance = await Item.findOneAndRemove({ title: req.params.title}).exec();
  if(!itemInstance) 
    return next(new Error('Could not find user.'))
  else {
    res.json("Deleted successfully!")
  }

});


