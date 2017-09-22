const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    id:  { type: String, unique: true },
    total_services: Number,
    total_bill: Number,
  });


  module.exports = mongoose.model('Account', AccountSchema);