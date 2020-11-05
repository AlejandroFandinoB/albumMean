// Modulo de node
const express = require("express");
const router = express.Router();

// Modulos internos
const Album = require("../model/album");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");

// rutas

// Listar actividades
router.get("/lista", auth, async (req, res) => {
    // Buscamos el usuario
    const usuario = await Usuario.findById(req.usuario._id);
    // si no existe el usuario
    if (!usuario) return res.status(400).send("El usuario no existe en BD");
    // Si el usuario existe
    const album = await Album.find({idUsuario: req.usuario._id}); 
    // enviamos lo que guardo en album
    res.send(album)
});

// Crear actividad con imagen
router.post("/cargarArchivo", cargarArchivo.single("sticker"), auth , async(req,res)=>{
    const url = req.protocol + "://" + req.get("host");
    // Validamos si existe el usario
    const usuario = await Usuario.findById(req.usuario._id);
    // si el usuario no existe
    if(!usuario) return res.status(400).send("El usuario no existe en BD");
    // si existe el usuario continuamos el proceso
    let rutaImagen = null; // es null para la libreria multer
    if (req.file.filename) {
        rutaImagen = url + "/public/" + req.file.filename;
    } else {
        rutaImagen = null;
    }
    // Guardar la actividad con imagen en BD
    const album = new Album({
        idUsuario: usuario._id,
        nombre: req.body.nombre,
        sticker: rutaImagen,
        estado: req.body.estado
    });
    // Enviamos resultado
    const result = await album.save();
    res.status(200).send(result);
})



// Actualizar actividad
router.put("/", auth, async(req, res)=>{
    // Buscamos el usuario por id
    const usuario = await Usuario.findById(req.usuario._id);
    // Si el usuario no existe
    if(!usuario) return res.status(400).send("El usuario no existe en BD");
    // Si el usuario existe 
    const album = await Album.findByIdAndUpdate(
        req.body._id,
        {
            idUsuario: req.usuario._id,
            nombre: req.body.nombre,
            estado:req.body.estado,
            fecha: Date.now()
        },
        {
            new : true,
        }
    );
    if(!album)
        return res.status(400).send("No hay actividad asignada a este usuario");
    res.status(200).send(album);

});

// Eliminar actividad
router.delete("/:_id",auth,async(req,res)=>{
    // Buscamos usuario
    const usuario = await Usuario.findById(req.usuario._id);
    // si no existe el usuario
    if(!usuario) return res.status(400).send("No hay usuario");
    // si existe el usuario eliminamos una actividad
    const album = await Album.findByIdAndDelete(req.params._id) // llega un parametro porque delete("/:_id") lleva un parameto de la url
    // si no existe esa actividad
    if(!album) return res.status(400).send("No se encontro actividad para eliminar");
    // Si se elimina una tarea
    res.status(200).send({message: "Actividad eliminada"}) // se envia solo un msj porque no hay nada, llego vacio.

})

module.exports = router;

