const express = require("express");
const { aprovisionarVM } = require("./controller");

const router = express.Router();

// 🔍 Ruta de salud para comprobar montaje
router.get("/health", (req, res) => res.json({ ok: true }));

// 🧪 Endpoint principal del ejercicio
router.post("/provision", aprovisionarVM);

module.exports = router; // 👈 exporta el router (CommonJS)
