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

// GET api/users/:id/messages/:message_id
async function getSingleMessage(req, res, next){
  try {
    let message = await Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
}

// DELETE /api/users/:id/messages/:message_id
// the prehook in the message model also ensure deletion from the associated user's messages array
async function deleteMessage(req, res, next) {
  try {
    let foundMessage = await Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

//get all message for a loggedin user and sort in descending order
//populate with basic user info 
async function getAllMessages(req, res, next) {
  try {
    let messages = await Message.find()
      .sort({ createdAt: 'desc' })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createMessage,
  getSingleMessage,
  deleteMessage,
  getAllMessages
}