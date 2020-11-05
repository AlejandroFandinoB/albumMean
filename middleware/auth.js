// modulo de node
const jwt = require("jsonwebtoken");

// Creamos validacion para identificar el usuario loguado y todos sus procesos
function auth(req, res, next){
    let jwtToken = req.header("Authorization"); // Nota: jsonwebtoken esta dentro del req
    
    // Split al JWT para separar el Beare que pone por defecto el header del Auth
    jwtToken = jwtToken.split(" ")[1]

    // Si el token no existe
    if(!jwtToken) return res.status(405).send("No hay token para un acceso");
    
    // si el token existe
    try{
        const payload = jwt.verify(jwtToken, "clave");
        req.usuario = payload;
        next();
    }catch(error){
        res.status(405).send("Token sin autorización")
    }
}

// Exports 
module.exports = auth;
