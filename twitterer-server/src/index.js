require('dotenv').config();
const   express         = require('express'),
        app             = express(),
        cors            = require('cors'),
        bodyParser      = require('body-parser'),
        errorHandler    = require('./handlers/error'),
        authRoutes      = require('./routes/auth'),
        messageRoutes   = require('./routes/messages'),
        { authorizeUser, loginRequired } = require('./middleware/auth'),
        { getAllMessages } = require('./handlers/messages');

app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, authorizeUser, messageRoutes);
app.get('/api/messages', loginRequired, getAllMessages);

//error handling
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(errorHandler);

module.exports = app;