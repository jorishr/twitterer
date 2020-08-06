const jwt = require('jsonwebtoken');

//authentication
function loginRequired(req, res, next) {
    //the format of the token is 'Bearer <token>'
    //verify the token part with key
    //if a payload can be decoded, the user is authenticated
    //try catch is added to handle the case whereby the request header does not contain relevant data
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
            if(payload) {
                next();
            } else {
                return next({ status: 401, message: 'Please Log In First' });
            }
        });
    } catch (err) {
        return next({ status: 401, message: 'Please Log In First' });
    }
};

//authorization
function authorizeUser(req, res, next) {
    //verify the token part with key
    //if a payload can be decoded, the user is authenticated
    //and id in payload needs to equal the user id in the url (req.params)
    //try catch is added to handle the case whereby the request header does not contain relevant data
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
            if(payload && payload.id === req.params.id) {
                next();
            } else {
                return next({ status: 401, message: 'Unauthorized' });
            }
        });
    } catch (err) {
        return next({ status: 401, message: 'Unauthorized' });
    }
};

module.exports = {
    loginRequired,
    authorizeUser
}