const controller = require("../controllers/parametros.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/parametros", controller.parametros);

    app.post("/api/parametros/contatos", [authJwt.verifyToken, authJwt.isAdmin] ,controller.alterarContatos);

};