import { model, Schema } from 'mongoose';
import { IUsuario } from '../interfaces/usuario.interface';
const usuarioSchema = new Schema<IUsuario>({
    usuario:{type:String,unique:true,uniqueCaseInsensitive:true,trim:true},
    email:{type:String,unique:true,uniqueCaseInsensitive:true,trim:true},
    pwd:{type:String},
    role:[{type:String}]
},
{
    timestamps:true
})

export const Usuario = model<IUsuario>('usuario',usuarioSchema);