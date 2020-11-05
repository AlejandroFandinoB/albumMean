// Modulos internos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Esquema
const esquemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
    },
    correo: {
        type: String,
    },
    pass: {
        type: String,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});

// Generamos el JWT (JsonWebToken)

esquemaUsuario.methods.generateJWT = function () {
    return jwt.sign({
            // sing para encriptar
            _id: this.id,
            nombre: this.nombre,
            correo: this.correo,
        },
        "clave" // --> palabra secreta para web token
    );
};

// Creamos los exports
const Usuario = mongoose.model("usuario", esquemaUsuario); // Usuario seria como una clase
module.exports.Usuario = Usuario; // exportamos el modulo
// en caso que se necesite
module.exports.esquemaUsuario = esquemaUsuario;