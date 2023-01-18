const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {type: String},
  price: {type: Number},
  city: { type: String },
  class: { type: String },
  bedroom: { type: Number },
  toylet: { type: Number },
  ac: { type: String },
  pet: { type: String },
  breakfast: { type: String },
  swimmingPool: { type: String },
  img: [String],
});

module.exports = mongoose.model("room", roomSchema);
