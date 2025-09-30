const { ParametrosVM } = require("../domain/parametrosvm");
const { crearProvisionador } = require("../Factory/factory"); // 👈 si renombraste, usa ../factory/factory
const { logger } = require("../utils/logger");

function limpiar(obj = {}) {
  const sensibles = [
    "token",
    "password",
    "secret",
    "key",
    "privateKey",
    "clientSecret",
  ];
  const o = {};
  for (const k in obj) o[k] = sensibles.includes(k) ? "***" : obj[k];
  return o;
}

async function aprovisionarVM(req, res) {
  try {
    const { proveedor, parametros } = req.body || {};
    if (!proveedor)
      return res
        .status(400)
        .json({ exito: false, vmId: null, error: "Falta 'proveedor'" });
    if (!parametros)
      return res
        .status(400)
        .json({ exito: false, vmId: null, error: "Falta 'parametros'" });

    const provisionador = crearProvisionador(proveedor.toLowerCase());
    if (!provisionador)
      return res.status(400).json({
        exito: false,
        vmId: null,
        error: `Proveedor no soportado: ${proveedor}`,
      });

    logger.info(
      `Solicitud -> ${proveedor} ${JSON.stringify(limpiar(parametros))}`
    );
    const params = new ParametrosVM(parametros);
    const vm = await provisionador.aprovisionar(params);

    res.status(201).json({ exito: true, vmId: vm.id, error: null });
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ exito: false, vmId: null, error: "Error interno" });
  }
}

module.exports = { aprovisionarVM };
