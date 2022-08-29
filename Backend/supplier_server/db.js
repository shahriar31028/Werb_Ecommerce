const mongoose = require("mongoose");

var mongourl =
  "mongodb+srv://sohaiya:sohaiya123@webtest.rih7ii8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongourl, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Connection done");
});

module.exports = mongoose;
