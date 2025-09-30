const { VM } = require("../domain/VM");

class ProvisionadorGCP {
  proveedor() {
    return "gcp";
  }

  obligatorios() {
    return ["machineType", "zone", "bootDisk", "project"];
  }

  validar(params) {
    const faltantes = this.obligatorios().filter((k) => !params.has(k));
    if (faltantes.length)
      throw new Error(`Faltan parámetros: ${faltantes.join(", ")}`);

    const zone = params.get("zone"); // ej: us-central1-a
    if (!/^[a-z]+-[a-z]+[0-9]-[a-z]$/.test(zone)) {
      throw new Error("La 'zone' de GCP debería parecer 'us-central1-a'");
    }
  }

  async aprovisionar(params) {
    this.validar(params);
    const id = `gcp-${Date.now()}`;
    return new VM(id, "running", this.proveedor());
  }
}

module.exports = { ProvisionadorGCP };
