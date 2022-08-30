const mongoose = require("mongoose");
const db = process.env.DATABASE || "mongodb://localhost:27017/whatsapp";
const connection = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = connection;
