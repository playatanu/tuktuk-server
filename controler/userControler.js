const User = require('../models/user');

exports.getAccount = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    res.status(200).json(user);
  } catch (error) {}
};

exports.createAccount = async (req, res) => {
  try {
    const newuser = new User(req.body);
    const user = await newuser.save();
    res.status(200).json({ message: 'user created' });
  } catch (error) {}
};
