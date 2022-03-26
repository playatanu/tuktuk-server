const router = require('express').Router();

const toto = require('../controler/riderControler');

router.post('/book', (req, res) => {
  toto.book(req, res);
});

router.post('/book/status', (req, res) => {
  toto.bookStatus(req, res);
});

router.post('/book/all', (req, res) => {
  toto.getAllBookings(req, res);
});

router.post('/book/active', (req, res) => {
  toto.bookActive(req, res);
});

router.post('/cancel', (req, res) => {
  toto.cancel(req, res);
});

module.exports = router;
