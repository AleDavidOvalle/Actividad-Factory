const express = require("express");
const routes = require("./api/routes");

const app = express();
app.use(express.json()); // 👈 antes de las rutas
app.use("/api", routes); // 👈 monta el router en /api

// raíz opcional para verificar que vive
app.get("/", (req, res) =>
  res.json({ mensaje: "Backend con Factory Method funcionando 🚀" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
