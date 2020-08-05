const User = require('../models/user');
const Message = require('../models/message');

async function createMessage(req, res, next) {
  try {
    let message = await Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createMessage
}