const mongoose = require("mongoose");

const Parametros = mongoose.model(
  "Parametros",
  new mongoose.Schema({
    instagram: String,
    facebook:String,
    email:String,
    tweeter:String,
    youtube:String
  })
);

module.exports = Parametros;