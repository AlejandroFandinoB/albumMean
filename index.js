// Modulos Node
const express = require("express");
const mongoose = require("mongoose");

// Modulos internos
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const album = require("./routes/album");

// APP
const app = express();
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/album/", album);

// Puerto para ejecutar nuestro servidor
const port = process.env.PORT || 3000; // depende del hosting o del localhost (3000)
app.listen(port, () => console.log("Ejecutando el puerto:" + port));

// Conexion con MongoDB
mongoose
    .connect("mongodb://localhost/appMusic", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conexion a MongoDB: online"))
    .catch((error) => console.log("Conexion a MongoDB: offline"));
