const Booking = require('../models/booking');

const clients = require('../ws');

exports.newBooking = async (req, res) => {
  try {
    const newBooking = await Booking.find({ status: 'open' });
    res.status(200).json(newBooking);
  } catch (error) {}
};

exports.confriem = async (req, res) => {
  const { email, _id } = req.body;

  var bookD;
  try {
    bookD = await Booking.findById(_id);
  } catch (error) {}

  if (bookD.driver !== '') res.status(400).json({ message: 'already book' });
  try {
    const booking = await Booking.findByIdAndUpdate(_id, {
      driver: email,
      status: 'online',
    });

    if (booking) res.status(200).json({ message: 'booking confrim' });
  } catch (error) {}

  clients.forEach(function etach(client) {
    if (client.id === bookD.email)
      client.send(JSON.stringify({ message: 'driver coming soon' }));
  });
};

exports.cancel = async (req, res) => {
  const { _id } = req.body;
  try {
    await Booking.findByIdAndUpdate(_id, { status: 'close' });
    res.status(200).json({ message: 'booking closed' });
  } catch (error) {}
};
