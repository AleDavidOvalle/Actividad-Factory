const { VM } = require("../domain/VM");

class ProvisionadorAzure {
  proveedor() {
    return "azure";
  }

  obligatorios() {
    return ["size", "resourceGroup", "image", "vnet"];
  }

  validar(params) {
    const faltantes = this.obligatorios().filter((k) => !params.has(k));
    if (faltantes.length)
      throw new Error(`Faltan parámetros: ${faltantes.join(", ")}`);

    const size = params.get("size");
    if (!/^Standard_[A-Z]\d\w*$/.test(size)) {
      throw new Error("El 'size' debería parecer 'Standard_B1s'");
    }
  }

  async aprovisionar(params) {
    this.validar(params);
    const id = `azure-${Date.now()}`;
    return new VM(id, "running", this.proveedor());
  }
}

module.exports = { ProvisionadorAzure };
