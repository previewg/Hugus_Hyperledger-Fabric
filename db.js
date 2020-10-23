const mongoose = require('mongoose');
let database;

module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://192.168.0.200:27017/HugusBlock',
            {useNewUrlParser: true, useUnifiedTopology: true},
            function (err) {
                if (err) {
                    console.error('mongodb connection error', err);
                }
                console.log('mongoDB Connected');
            }
        )
    }
    connect();
    mongoose.connection.on('disconnected', connect);
    return database;
}