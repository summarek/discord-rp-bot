const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

const url = `mongodb+srv://${process.env.MONGODB_NICKNAME}:${process.env.MONGODB_PASSWORD}@mongodatabase-tt40v.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", (err) => {
  logError(err);
});

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

const dowodSchema = mongoose.Schema({
  idWlasciciela: {},
  imie: {},
  nazwisko: {},
  wiek: {},
  data: {},
  narodowosc: {},
});

var Dowod = mongoose.model("Dowod", dowodSchema);

app.listen(3000);

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

client.on("ready", () => {
  console.log("CONNECTED AS " + client.user.tag);

  client.on("message", async (message) => {
    if (
      message.channel.id == "696493487121760331" &&
      message.content == "!rpbot"
    ) {
      message.channel
        .send(`${message.author} Aby stworzyć swój dowód napisz i podaj kolejno informacje o Twojej postaci: !rpbot Imie Nazwisko dataUrodzenia (w formacie DD/MM/RRRR) Narodowość \n
	  na przykład: !rpbot Jan Nowak 26/11/2000 Polska \n
	  aby edytować swój dowód napisz: !rpbot kryterium(imie/nazwisko/dataurodzenia/narodowosc) nowaWartość \n
	  na przykład: !rpbot Imie Jaś \n
	  aby zobaczyć swój dowód napisz: !dowod`);
    } else if (
      message.content.split(" ").length == 5 &&
      message.content.split(" ")[0] == "!rpbot"
    ) {
      Dowod.findOne({ idWlasciciela: message.author.id }, async function (
        err,
        doc
      ) {
        if (err) return handleError(err);
        if (doc != null && doc.idWlasciciela == message.author.id) {
          message.channel.send(
            `${message.author} masz już swój dowód, edytuj go.`
          );
        } else {
          var testDowod = await new Dowod({
            idWlasciciela: message.author.id,
            imie: capitalize(message.content.split(" ")[1]),
            nazwisko: capitalize(message.content.split(" ")[2]),
            wiek:
              parseInt(new Date().getFullYear()) -
              parseInt(
                message.content
                  .split(" ")[3]
                  .substring(message.content.split(" ")[3].length - 4)
              ),
            data: message.content.split(" ")[3],
            narodowosc: capitalize(message.content.split(" ")[4]),
          });

          testDowod.save(function (err) {
            if (err) throw err;
            message.channel.send(
              `${message.author} twój dowód został utworzony!`
            );
            console.log("SUCCESS");
          });
        }
      });
    }
  });
});

client.login(process.env.DISCORD_TOKEN);
