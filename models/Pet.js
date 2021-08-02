const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  breed: String,
  name: String,
  img: String,
  description: String,
  location: String,
  adopted: Boolean,
  id_owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
