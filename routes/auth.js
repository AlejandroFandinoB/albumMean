// Modulos de NODE
const express = require("express");
const router = express.Router();

// Modulos internos
const { Usuario } = require("../model/usuario");

// Ruta
router.post("/", async(req,res)=>{
    // validamos que el correo exista (en la BD)
    const usuario = await Usuario.findOne({correo: req.body.correo})
    // si el corre no existe
    if(!usuario) return res.status(400).send("Correo o contraseña no son validos")  // error 400 del usuario 
    // si el pass no existe
    if(usuario.pass !== req.body.pass) return res.status(400).send("Correo o contraseña no son validos"); // valida si el pass de usuario es igual al pass de request
    // Generamos el JWT
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});
});
module.exports = router;

