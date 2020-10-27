const mongoose = require("mongoose");
let database;

module.exports = () => {
<<<<<<< HEAD
    function connect() {
        mongoose.connect('mongodb://localhost:27017/HugusBlock',
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
=======
  function connect() {
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
>>>>>>> e41752f1d3397b6c2a5d519f60c3fb12b9b6fd5c
