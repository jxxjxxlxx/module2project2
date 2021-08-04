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
  previousPets: String,
  currentPets: String,
  personalityPreference: String,
  crate: Boolean,
  aloneTime: Number,
  whereAtNight: String,
  isBehaved: Boolean,
  dogClass: Boolean,
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Adopt = mongoose.model("Adopt", adoptSchema);

module.exports = Adopt;
