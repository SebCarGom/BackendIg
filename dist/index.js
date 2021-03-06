"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Server_1 = require("./clases/Server");
const usuario_rutas_1 = __importDefault(require("./rutas/usuario.rutas"));
const mongoose_1 = __importDefault(require("mongoose"));
const servidor = new Server_1.Server();
servidor.app.use(body_parser_1.default.urlencoded({ limit: "5mb", extended: true }));
servidor.app.use(body_parser_1.default.json({ limit: "5mb" }));
servidor.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
servidor.app.use("/usuarios", usuario_rutas_1.default);
servidor.start(() => {
    console.log("Servidor iniciado en el puerto " + servidor.port);
});
mongoose_1.default.connect('mongodb://localhost:27017/miAppBBDD', (err) => {
    if (err) {
        console.log('no podemos conectar');
        throw err;
    }
    else {
        console.log('conectado a la base de datos');
    }
});
