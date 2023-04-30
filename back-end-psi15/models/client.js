const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  username: { type: String, required: true, minLength: 3 },
  password: { type: String, required: true, minLength: 8 },
  //games: { type: String},
});


// Virtual for author's URL
ClientSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/client/${this._id}`;
});

// Export model
module.exports = mongoose.model("Client", ClientSchema);
