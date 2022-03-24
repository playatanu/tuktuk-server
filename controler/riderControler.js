const Booking = require('../models/booking');

const clients = require('../server');

exports.book = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const resBook = await newBooking.save();
    if (resBook) res.send('booking sucess full');
  } catch (error) {}

  clients.forEach(function etach(client) {
    client.send(JSON.stringify({ message: 'new booking' }));
  });
};

exports.cancel = async (req, res) => {
  const { _id } = req.body;
  try {
    await Booking.findByIdAndUpdate(_id, { status: 'close' });
    res.status(200).json({ message: 'booking closed' });
  } catch (error) {}
};
