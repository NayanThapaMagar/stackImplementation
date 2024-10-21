const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Price: {
        type: String,
        required: true,
      },
    ID: {
      type: Number,
      // unique: true,
    },

  },
  { timestamps: false }
);

module.exports = mongoose.model('Product', productSchema);