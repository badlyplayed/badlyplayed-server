const config = require("../config/auth.config");
const db = require("../models");
const Historia = db.historia;

exports.getAllHistorias = (req, res) => {
    Historia.find().exec((err, data) => {
        res.status(200).send(data);
    });
}

exports.getHistoriaById = (req, res) => {
    if( req.params["id"] != undefined ){
        id = req.params["id"];
        Historia.find({"_id":id}).limit(1).exec((err, data) => {
            res.status(200).send(data);
        });
    }else{
        res.status(500).send({"message":"no id provided","ok":"false"});
    }    
}

exports.insertHistoria = (req, res) => {
    
    // request.headers['x-forwarded-for']
    // TODO : Implement IP Bllcklist or IP antiflood

    errorResponse = {}
    if (req.body.idade == null) {
        errorResponse['message'] = "idade must be provided"
        res.status(500).send(errorResponse);
    }
    if (req.body.genero == null) {
        errorResponse['message'] = "genero must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.jogo == null) {
        errorResponse['message'] = "jogo must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataDia == null) {
        errorResponse['message'] = "dataDia must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataMes == null) {
        errorResponse['message'] = "dataMes must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataAno == null) {
        errorResponse['message'] = "dataAno must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.pais == null) {
        errorResponse['message'] = "pais must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.detalhes == null) {
        errorResponse['message'] = "detalhes must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.foiPunido == null) {
        errorResponse['message'] = "foiPunido must be provided";
        res.status(500).send(errorResponse);
    }

    new Historia(req.body).save(err => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({ 'message': 'História dicionada com sucesso' , 'ok':'true' });
    });

}

exports.atualizarHistoria = (req, res) => {
    errorResponse = {}
    if (req.body._id == null) {
        errorResponse['message'] = "_id must be provided"
        res.status(500).send(errorResponse);
    }
    if (req.body.idade == null) {
        errorResponse['message'] = "idade must be provided"
        res.status(500).send(errorResponse);
    }
    if (req.body.genero == null) {
        errorResponse['message'] = "genero must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.jogo == null) {
        errorResponse['message'] = "jogo must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataDia == null) {
        errorResponse['message'] = "dataDia must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataMes == null) {
        errorResponse['message'] = "dataMes must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.dataAno == null) {
        errorResponse['message'] = "dataAno must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.pais == null) {
        errorResponse['message'] = "pais must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.detalhes == null) {
        errorResponse['message'] = "detalhes must be provided";
        res.status(500).send(errorResponse);
    }
    if (req.body.foiPunido == null) {
        errorResponse['message'] = "foiPunido must be provided";
        res.status(500).send(errorResponse);
    }

    Historia.findOne({"_id":req.body._id}).sort({ _id: -1 }).findOneAndUpdate(req.body,(err,updated)=>{
        if( err ){
            res.status(500).send({"message":"error"});
        }else{
            res.status(200).send({"message":"updated"});
        }
    });
};

exports.apagarHistoria = (req, res) => {
    Historia.findOneAndRemove({ '_id': req.body._id }).exec((err, doc) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(doc);
    });
};