// Modulos Nodejs

// importar modulos de Express
const express = require("express");
const router = express.Router(); // traemos router desde express

// Modulos internos (creados por nosotros)
const { Usuario } = require("../model/usuario");

// Ruta 
router.post("/",async(req,res)=>{
    // validamos solo para un correo
    let usuario = await Usuario.findOne({correo: req.body.correo})
    
    // si encuentra el correo en BD
    if(usuario) return res.status(400).send("El correo ya está registrado");

    // Si el correo no existe en BD 
    usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        pass: req.body.pass,
    });
    // Guardamos el usario que se va a crear con el JWT
    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});

});

// Exports
module.exports = router;
