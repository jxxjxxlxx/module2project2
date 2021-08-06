const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  dateofbirth: Date,
  city: String,
  phone: Number,
  admin: {
    type: Boolean,
    required: false
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
