require('dotenv').config({ debug: process.env.DEBUG });
const   app      = require('../index'),
        mongoose = require('mongoose'),
        port     = process.env.EXPRESS_PORT;

(async () => {
    try {
        await app.listen(port, () => console.log(`\nExpress Server is listening on port ${port}`));
    } catch (err){
        console.error('Failed to start the Express server\n', err);
    }
})();
//db connection
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_CLOUD, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error('Failed to setup initial db connection', err);
    }
})()
//listen for db connection events
mongoose.set('debug', true)
mongoose.connection.once('open', () => {
    console.log('Database connection established\n');
});
mongoose.connection.on('error', () => {
    console.error('Database error\n')
});
mongoose.connection.on('disconnected', () => { 
    console.error('Database connection lost. Auto-reconnect...\n')
    setTimeout(() => {
        console.error('readyState:', mongoose.connection.readyState)
        if(mongoose.connection.readyState !== 1){
            return console.error('Unable to re-establish db connection');
        } 
    }, 5000);
});