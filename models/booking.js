const mongoose = require('mongoose');

const bookingSceama = mongoose.Schema(
  {
    status: { type: String, default: 'open' },
    email: { type: String, require: true },
    from: { type: Object, require: true },
    to: { type: Object, require: true },
    driver: { type: String, default: '' },
    seats: { type: String, require: true },
    amount: { type: String, require: true },
  },

  { timestamps: true }
);
module.exports = mongoose.model('Booking', bookingSceama);
