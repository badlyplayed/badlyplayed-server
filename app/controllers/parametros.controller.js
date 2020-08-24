const config = require("../config/auth.config");
const db = require("../models");
const Parametros = db.parametros;

exports.parametros = (req, res) => {
    Parametros.findOne().limit(1).exec((err, parametro) => {
        res.status(200).send(parametro);
    });
};

exports.alterarContatos = (req,res) => {
    
    errorResponse = {}
    if(req.body.instagram == null){
        errorResponse['message'] = "instagram must be provided"
        res.status(500).send(errorResponse);
    }
    if(req.body.facebook == null){
        errorResponse['message'] = "facebook must be provided";
        res.status(500).send(errorResponse);
    }
    if(req.body.email == null){
        errorResponse['message'] = "email must be provided";
        res.status(500).send(errorResponse);
    }
    if(req.body.tweeter == null){
        errorResponse['message'] = "tweeter must be provided";
        res.status(500).send(errorResponse);
    }
    if(req.body.youtube == null){
        errorResponse['message'] = "youtube must be provided";
        res.status(500).send(errorResponse);
    }

    Parametros.findOne().sort({ _id: -1 }).findOneAndUpdate(req.body,(err,updated)=>{
        if( err ){
            res.status(500).send({"message":"error"});
        }else{
            res.status(200).send({"message":"updated"});
        }
    });

};
