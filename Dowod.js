const mongoose = require("mongoose");

const dowodSchema = mongoose.Schema({
  idWlasciciela: { type: String, required: true },
  imie: { type: String, required: false },
  nazwisko: { type: Array, required: false },
  wiek: { type: Number, required: false },
  data: { type: Number, required: false },
  narodowosc: { type: Number, required: false },
  wiek: { type: Number, required: false },
});

module.exports = mongoose.model("Dowod", dowodSchema);
