const mongoose = require("mongoose");
let database;

module.exports = () => {
  function connect() {
    // mongoose.connect("mongodb+srv://brave-son:qwe123@hugus0.hyowm.mongodb.net/HUGUS",
    mongoose.connect(
      "mongodb+srv://brave-son:qwe123@hugus0.hyowm.mongodb.net/HUGUS",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err) {
        if (err) {
          console.error("mongodb connection error", err);
        }
        console.log("mongoDB Connected");
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  return database;
};
