const mongoose = require("mongoose");

const Historia = mongoose.model(
    "Historia",
    new mongoose.Schema({
        nome: String,
        idade: {
            type: Number,
            required: true
        },
        genero: {
            type: String,
            enum: ['feminino', 'masculino'],
            required:true
        },
        jogo: {
            type:String,
            required:true
        },
        dataDia: {
            type:Number,
            required:true
        },
        dataMes: {
            type:String,
            required:true
        },
        dataAno: {
            type:Number,
            required:true
        },
        data: Date,
        printscreen: String,
        pais: {
            type:String,
            required:true
        },
        detalhes: {
            type:String,
            required:true
        },
        foiPunido: {
            type: String,
            enum: ['sim', 'nao', 'naosei'],
            required:true
        }
    })
);

module.exports = Historia;