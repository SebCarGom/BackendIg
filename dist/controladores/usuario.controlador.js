"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_modelo_1 = require("../modelos/usuario.modelo");
class usuarioController {
    getDatos(req, res) {
        console.log(req.query);
        let usuario = req.query.usuario;
        if (usuario) {
            return res.status(200).json({
                status: "ok",
                message: "el usuario es " + usuario
            });
        }
        else {
            return res.status(500).json({
                status: "fail",
                message: "no hay usuario"
            });
        }
    }
    crearUsuario(req, res) {
        let u = new usuario_modelo_1.Usuario();
        u.usuario = req.body.usuario;
        u.email = req.body.email;
        u.role = ['01'];
        u.pwd = req.body.pwd;
        usuario_modelo_1.Usuario.create(u, (err, usuarioDB) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                return res.status(200).json({
                    status: 'ok',
                    message: 'el usuario creado es' + usuarioDB.usuario,
                    usuario: usuarioDB
                });
            }
        });
    }
    login(req, res) {
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;
        if (usuario) {
            return res.status(200).json({
                status: "ok",
                message: "el usuario es " + usuario
            });
        }
        else {
            return res.status(200).json({
                status: "fail",
                message: "no hay usuario"
            });
        }
    }
}
exports.default = usuarioController;
