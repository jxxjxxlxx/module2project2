const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  breed: String,
  name: String,
  img: String,
  description: String,
  location: String,
  adopted: Boolean,
  id_owner: { String: Schema.types.ObjectId, ref: "user_Id" },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
