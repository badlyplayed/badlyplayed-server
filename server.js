const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var mongoClient = require("mongodb").MongoClient;

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Historia = require("./app/models/historia.model");
const Role = db.role;
const Recorde = db.recorde;
const Parametros = db.recorde;

// Database parameters
db.mongoose
  .connect(`mongodb://badlyplayed:iV24v0B85ulNMgQCfrlFAH9Bfjaz2dQA4w43Fz0MnGWGxr2xXob2vObgtUI1b8zfPkuq4fEPkcrkw4vUS94zhg==@badlyplayed.mongo.cosmos.azure.com:10255/?ssl=true&appName=@badlyplayed@`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to #badlyplayed server. Service is running" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/recorde.routes")(app);
require("./app/routes/parametros.routes")(app);
require("./app/routes/historia.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Carga inicial de dados
function initial() {

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  Recorde.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new Recorde({
        recordeAtual: 5,
        recordeAnterior: 8
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Recorde '5/8 dias' adicionado a coleção");
      });

    }
  });

  Parametros.countDocuments((err, count) => {
    if (!err && count === 0) {

      new Parametros({
        instagram: '@badlyplayedofficial',
        facebook: '#badlyplayed',
        email: 'me@badlyplayed.com',
        tweeter:'@badlyplayed',
        youtube:'#badlyPlayedChannel'
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Parametros adicionado a coleção");
      });

    }
  });

  Historia.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Historia({
        nome:'Arthur Klug Neto',
        idade:33,
        genero:'masculino',
        jogo:'Super Mario World',
        dataDia:08,
        dataMes:11,
        dataAno:1986,
        pais:'Brasil',
        detalhes:'O KopaTropa ficou me trollando na fase 1-1 e saiu voando',
        foiPunido:'nao'
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Historia adicionado a coleção");
      });

    }
  });
}
