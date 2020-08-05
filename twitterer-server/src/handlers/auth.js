const   User = require('../models/user'),
        jwt = require('jsonwebtoken');

async function signup(req, res, next){
    //create user
    //create jwt
    try {
        let user = await User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
          process.env.SECRET_KEY
        );
        return res.status(200).json({
          id,
          username,
          profileImageUrl,
          token
        });
    } catch (err) {
        //mongoose error reporting code: validation fail, username/email already taken
        //or generic error code
        if (err.code === 11000) {
            err.message = 'Sorry, that username and/or email is taken';
        }
        return next({
          status: 400,
          message: err.message
        });
    }
};    

async function signin(req, res, next){
  try {
    // finding user in db
    let user = await User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    //compare pw with instance method
    let isMatch = await user.comparePassword(req.body.password);
    //if match, sign a new webtoken
    if (isMatch) {
      let token = jwt.sign({
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      //send as response
      return res.status(200).json({
          id,
          username,
          profileImageUrl,
          token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email/Password.'
      });
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Email/Password.' });
  }
};

module.exports = {
    signin,
    signup
}