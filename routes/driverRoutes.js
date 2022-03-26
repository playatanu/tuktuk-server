const router = require('express').Router();

const book = require('../controler/driverControler');

router.get('/bookings', (req, res) => {
  book.newBooking(req, res);
});

router.post('/confrim', (req, res) => {
  book.confriem(req, res);
});

router.post('/cancel', (req, res) => {
  book.cancel(req, res);
});

router.post('/close', (req, res) => {
  book.close(req, res);
});

module.exports = router;
