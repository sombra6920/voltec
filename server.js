const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// CONFIG SQL SERVER
// ==========================
const config = {
    user: "sombra",
    password: "2004",
    server: "localhost",   // 👈 SOLO ESTO
    database: "mapa_recarga",
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};
// ==========================
// CONEXIÓN
// ==========================
sql.connect(config)
.then(() => console.log("✅ Conectado a SQL Server"))
.catch(err => console.log("❌ Error:", err));

// ==========================
// RUTA PRINCIPAL
// ==========================
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// ==========================
// GET DESDE SQL
// ==========================
app.get("/centros", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM centros_recarga");
        res.json(result.recordset);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// ==========================
// SERVIDOR
// ==========================
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});