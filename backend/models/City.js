const mongoose = require("mongoose");
const citySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cityID: {
      type: Number,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
