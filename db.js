const mongoose = require("mongoose");
let database;

module.exports = () => {
  function connect() {
    // mongoose.connect('mongodb://192.168.0.200:27017/HugusBlock',
    mongoose.connect(
      "mongodb+srv://brave-son:qwe123@hugus0.hyowm.mongodb.net/HUGUS",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err) {
        if (!err) {
          console.log("mongoDB Connected");
        } else console.error("mongodb connection error", err);
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  return database;
};
