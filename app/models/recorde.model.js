const mongoose = require("mongoose");

const Recorde = mongoose.model(
  "Recorde",
  new mongoose.Schema({
    recordeAtual: Number,
    recordeAnterior : Number
  })
);

module.exports = Recorde;