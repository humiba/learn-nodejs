const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);