const mongoose = require("mongoose");
let database;

module.exports = () => {
  function connect() {
    mongoose.connect(
      process.env.MONGO_REMOTE_URL,
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
