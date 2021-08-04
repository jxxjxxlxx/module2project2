const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adoptSchema = new Schema({
  household: Boolean,
  caregiver: String,
  housetype: String,
  fence: Boolean,
  adult: Number,
  children: Number,
  animal: Boolean,
  listPets: String,
  petCurrently: String,
  petPersonality: String,
  crate: Boolean,
  howManyHours: Number,
  whereAtNight: String,
  behavior: Boolean,
  largeBreed: Boolean,
  dogClass: Boolean,
  giveup: String,
  giveupCase: String,
});

const Adopt = mongoose.model("Adopt", adoptSchema);

module.exports = Adopt;
