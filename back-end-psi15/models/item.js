const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  type: { type: String, required: true},
  description: { type: String, required: true, maxLength: 1000},
  platform: { type: String, required: true},
  languages: [{ type: String, required: true}],
  price: {type: Number , requeired: true},
  classification: {type: Number},
  title: {type: String, require: true, unique: true},
});


// Virtual for author's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
