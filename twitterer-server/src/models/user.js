const   mongoose  = require('mongoose'),
        bcrypt    = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageUrl: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
});

//hash password
userSchema.pre('save', async function(next) {
  try {
    //only hash password if it is modified, else move on
    if (!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
})

//instance method available for every document created from this model
//checks if input password matches stored hashed password for this specific document
//async, thus next() method needs to be called to tell express when to move on
userSchema.methods.comparePassword = async function(inputPassword, next){
  try {
    let isMatch = await bcrypt.compare(inputPassword, this.password);
    //if true, on the route handler the login can proceed
    return isMatch;
  } catch {
    next(err);   
  }
}

const User = mongoose.model('User', userSchema);
  
module.exports = User;