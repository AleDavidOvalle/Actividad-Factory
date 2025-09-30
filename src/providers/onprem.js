const { VM } = require("../domain/VM");

class ProvisionadorOnPrem {
  proveedor() {
    return "onprem";
  }

  obligatorios() {
    return ["cpuCores", "ramGB", "diskGB", "networkIface"];
  }

  validar(params) {
    const faltantes = this.obligatorios().filter((k) => !params.has(k));
    if (faltantes.length)
      throw new Error(`Faltan parámetros: ${faltantes.join(", ")}`);

    const nPos = (x) => !Number.isNaN(Number(x)) && Number(x) > 0;
    if (
      !nPos(params.get("cpuCores")) ||
      !nPos(params.get("ramGB")) ||
      !nPos(params.get("diskGB"))
    ) {
      throw new Error("cpuCores, ramGB y diskGB deben ser números positivos");
    }
  }

  async aprovisionar(params) {
    this.validar(params);
    const id = `onprem-${Date.now()}`;
    return new VM(id, "running", this.proveedor());
  }
}

module.exports = { ProvisionadorOnPrem };
