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

  // is alredy booked ?
  var bookD;
  try {
    bookD = await Booking.findById(_id);
  } catch (error) {}

  if (bookD.driver !== '') {
    res.status(400).json({ message: 'already book' });
    return;
  }
  // set driver
  try {
    const booking = await Booking.findByIdAndUpdate(_id, {
      driver: email,
      status: 'online',
    });
  } catch (error) {}

  // send rider comming soon

  console.log('=>>>>>>>> sending user ');
  clients.forEach(function etach(client) {
    if (client.id === bookD.email) {
      client.send(
        JSON.stringify({
          code: 2,
          message: `driver  coming soon ${email}`,
        })
      );
    }
  });

  res.status(200).json({ message: 'booking confrim' });
};

exports.cancel = async (req, res) => {
  const { _id } = req.body;
  try {
    await Booking.findByIdAndUpdate(_id, { status: 'cancel' });
    res.status(200).json({ message: 'booking cancel' });
  } catch (error) {}
};

exports.close = async (req, res) => {
  const { _id } = req.body;
  var resBooking;
  try {
    resBooking = await Booking.findByIdAndUpdate(_id, { status: 'close' });

    clients.forEach(function etach(client) {
      if (client.id === resBooking.email) {
        client.send(
          JSON.stringify({
            code: 3,
            message: `thank you ${client.id}`,
          })
        );
      }
    });
  } catch (error) {}

  if (resBooking) res.status(200).json({ message: 'booking closed' });
};
