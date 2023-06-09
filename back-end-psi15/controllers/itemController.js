const Item = require("../models/item");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all item.
exports.item_list = asyncHandler(async (req, res, next) => {
    try {
      const allItems = await Item.find().exec();
      res.send(allItems);
    } catch(error) {
      console.error(error);
    }
    
});

// Post new item.
exports.item_create_post = asyncHandler(async (req, res, next) => {

  var item = new Item(req.body);
  await item.save()
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
      const itemInstance = await Item.findOne({ title: req.params.title}).exec();
      res.json(itemInstance);
    } catch(error) {
      console.error(error);
    }
});

// Deleted existing item. Returns a error if no item found.
exports.item_delete_get = asyncHandler(async (req, res, next) => {

  const itemInstance = await Item.findOneAndRemove({ title: req.params.title}).exec();
  if(!itemInstance) 
    return next(new Error('Could not find item.'))
  else {
    res.json("Deleted successfully!")
  }

});

// Deleted existing item. Returns a error if no item found.
exports.item_deleteById_get = asyncHandler(async (req, res, next) => {

  const itemInstance = await Item.findOneAndRemove({ id: req.params.id}).exec();
  if(!itemInstance) 
    return next(new Error('Could not find item.'))
  else {
    res.json("Deleted successfully!")
  }

});


