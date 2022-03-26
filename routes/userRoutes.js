const router = require('express').Router();

const user = require('../controler/userControler');

router.post('/account', (req, res) => {
  user.getAccount(req, res);
});

router.post('/create', (req, res) => {
  user.createAccount(req, res);
});

module.exports = router;
