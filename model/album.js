// Modulos internos
const mongoose = require("mongoose");

// Esquema
const esquemaAlbum = new mongoose.Schema({
    idUsuario: String,
    nombre: String,
    sticker: String,
    estado: String,
    fecha: {
        type: Date,
        default: Date.now,
    },
});

// Creamos los exports
const Album = mongoose.model("album",esquemaAlbum);
module.exports= Album; 
