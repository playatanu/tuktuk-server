const router = require('express').Router();

const toto = require('../controler/riderControler');

router.post('/book', (req, res) => {
  toto.book(req, res);
});

router.post('/cancel', (req, res) => {
  toto.cancel(req, res);
});

module.exports = router;
