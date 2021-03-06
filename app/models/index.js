const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.historia = require("./historia.model");
db.recorde = require("./recorde.model");
db.parametros = require("./parametros.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;