import { Request,Response } from "express";
import { Usuario } from '../modelos/usuario.modelo';
import { Token } from '../clases/Token';

class usuarioController{

    getDatos(req:Request,res:Response){
        console.log(req.query);
        let usuario = req.query.usuario;
        if(usuario){
            return res.status(200).json({
                status:"ok",
                message:"el usuario es " + usuario
            });
        }
        else{
            return res.status(500).json({
                status:"fail",
                message:"no hay usuario"
            })
        }
    }
    crearUsuario(req:Request,res:Response){

        let u = new Usuario();
        u.usuario = req.body.usuario;
        u.email = req.body.email;
        u.role = ['01'];

        u.pwd = req.body.pwd;
        Usuario.create(u,(err,usuarioDB)=>{
            if(err){
                console.log(err);
                throw err;
            } else {
                return res.status(200).json({
                    status:'ok',
                    message:'el usuario creado es' + usuarioDB.usuario,
                    usuario:usuarioDB
                })
            }
        })

    }
    login(req:Request,res:Response){
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;
        const bcrypt = require('bcrypt');
        
        Usuario.findOne({usuario:usuario}), null, null, (err:any,usuarioDB:any)=>{
            if(err){
                throw err;
            }
            if(usuarioDB){
                if(bcrypt.compareSync(pwd, usuarioDB.pwd)){
                const usuarioQueMando = new Usuario();
                usuarioQueMando._id = usuarioDB._id;
                usuarioQueMando.usuario = usuarioDB.usuario;
                usuarioQueMando.role = usuarioDB.role;
                return res.status(200).json({
                    status:"ok",
                    _id:usuarioDB._id,
                    token: Token.generaToken(usuarioQueMando)
                });
            } else {
                return res.status(200).json({
                    status:"ok",
                    message:"la contraseña no es correcta"
                })
            }
            }
            else{
                return res.status(200).json({
                    status:"fail",
                    message:"no hay usuario"
                })
            }
        }
        
    }
}

export default usuarioController;