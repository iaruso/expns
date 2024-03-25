const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: 'en'
  },
  currency: {
    type: String,
    default: 'usd'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
