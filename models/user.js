const mongoose = require('mongoose');

const userSceama = mongoose.Schema(
  {
    id: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true },
  },

  { timestamps: true }
);
module.exports = mongoose.model('User', userSceama);
