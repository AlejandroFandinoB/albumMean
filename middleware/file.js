// modulos de node
const multer = require("multer");

// ruta del directorio donde quedaran los archivos 
const directorio = "./public";

// DiskStorage
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{ // (req, file, callback)=>{}
        cb(null,directorio);
    },
    filename: (req, file, cb)=>{
        const filename = Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
        cb(null,filename);    
    }
    
})
// Cargar archivos
const cargarArchivo = multer({
    storage:storage, 
    fileFilter:(req, file, cb) => {
         console.log(file.mimetype) // verificamos la extension de multer
        if (file.mimetype == "image/jpg" || file.mimetype=="image/jpeg" ||file.mimetype=="image/png" || file.mimetype=="image/gif") {
            cb(null,true)
        } else {
            cb(null,false)
            return cb(new Error("Solo se acepta extensiones .jpg - .png - .gif"))
        }
    },
});
module.exports =cargarArchivo;