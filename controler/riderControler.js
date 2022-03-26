const Booking = require('../models/booking');

const clients = require('../ws');

const User = require('../models/user');

exports.book = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const resBook = await newBooking.save();
    if (resBook)
      res
        .status(200)
        .json({ message: 'booking suscessfull', _id: resBook._id });
  } catch (error) {}

  clients.forEach(function etach(client) {
    console.log();
    client.send(JSON.stringify({ code: 11, message: 'new booking' }));
  });
};

exports.getAllBookings = async (req, res) => {
  const { email } = req.body;

  try {
    const allBooking = await Booking.find({ email: email });

    res.status(200).json(allBooking);
  } catch (error) {}
};

exports.bookActive = async (req, res) => {
  const { email } = req.body;

  try {
    const active = await Booking.findOne({ email: email, status: 'online' });

    res.status(200).json(active);
  } catch (error) {}
};

exports.bookStatus = async (req, res) => {
  const { _id } = req.body;

  var driver;
  var bookD;
  var allD;

  try {
    bookD = await Booking.findById(_id);
  } catch (error) {}

  // if (bookD.driver !== null) {
  try {
    driver = await User.findOne({ email: bookD.driver });
    allD = { driver: driver, booking: bookD };
  } catch (error) {}
  res.status(200).json(allD);
  // } else res.status(200).json({ message: 'waiting for driver confrim' });
};

exports.cancel = async (req, res) => {
  const { _id } = req.body;
  var resBooking;
  try {
    resBooking = await Booking.findByIdAndUpdate(_id, { status: 'cancel' });
    res.status(200).json({ message: 'booking cancel' });
    clients.forEach(function etach(client) {
      if (client.id === resBooking.email) {
        client.send(
          JSON.stringify({
            code: 20,
            message: `cancel a ride`,
          })
        );
      }
    });
  } catch (error) {}
};

exports.close = async (req, res) => {
  const { _id } = req.body;
  try {
    await Booking.findByIdAndUpdate(_id, { status: 'close' });
    res.status(200).json({ message: 'booking closed' });
  } catch (error) {}
};
