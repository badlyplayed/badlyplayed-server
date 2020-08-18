const config = require("../config/auth.config");
const db = require("../models");
const Recorde = db.recorde;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.recordes = (req, res) => {
    Recorde.findOne().sort({ _id: -1 }).limit(1).exec((err, record) => {
        if( err ){
            res.status(200).send({
                "recordeAtual": 0,
                "recordeAnterior": 0
            });
        }
        res.status(200).send(record);
    });
};