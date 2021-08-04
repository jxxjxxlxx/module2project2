const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  admin: Boolean,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  dateofbirth: Date,
  city: String,
  phone: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
