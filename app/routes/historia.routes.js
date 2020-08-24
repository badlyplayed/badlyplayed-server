const { authJwt } = require("../middlewares");
const controller = require("../controllers/historia.controller");

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // TODO : Allow both moderator and admin
    app.get("/api/historias",
        [authJwt.verifyToken, authJwt.isAdminOrModerator ],
        controller.getAllHistorias
    );

    app.get("/api/historias/:id",
        [authJwt.verifyToken, authJwt.isAdminOrModerator ],
        controller.getHistoriaById
    );

    app.post("/api/historias",controller.insertHistoria);

    app.post("/api/historias/apagar",[authJwt.verifyToken, authJwt.isAdmin ],controller.apagarHistoria);

    app.post("/api/historias/atualizar",[authJwt.verifyToken, authJwt.isAdmin ],controller.atualizarHistoria);

};