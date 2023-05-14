const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  password: { type: String, required: true, minLength: 8},
  wallet: {type: String, default:"200"},
  games: {
    type: Map,
    of: Date,
    key: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
    }
  },
  cart: {
    type: Map,
    of: Number,
    key: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
    }
  },
  image: {type: String, required: true},
});


// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
