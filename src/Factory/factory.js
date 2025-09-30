// Factory Method: una función que "crea" el objeto correcto según proveedor
const aws = require("../providers/aws");
const azure = require("../providers/azure");
const gcp = require("../providers/gcp");
const onprem = require("../providers/onprem");

// Registro simple (fácil de extender sin tocar el controlador)
const registro = {
  aws: () => new aws.ProvisionadorAWS(),
  azure: () => new azure.ProvisionadorAzure(),
  gcp: () => new gcp.ProvisionadorGCP(),
  onprem: () => new onprem.ProvisionadorOnPrem(),
};

function crearProvisionador(nombreProveedor) {
  return registro[nombreProveedor]?.() || null;
}

module.exports = { crearProvisionador };
