const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//when removing a message the reference in the messages array of the user also needs to be removed
messageSchema.pre('remove', async function(next) {
  try {
    // find the user
    // remove the id of the message from their messages list
    // save that user
    let user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
