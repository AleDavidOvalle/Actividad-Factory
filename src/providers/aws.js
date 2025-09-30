// Provisionador concreto de AWS (validaciones sencillas)
const { VM } = require("../domain/VM");

class ProvisionadorAWS {
  proveedor() {
    return "aws";
  }

  obligatorios() {
    return ["instanceType", "region", "vpcId", "ami"];
  }

  validar(params) {
    const faltantes = this.obligatorios().filter((k) => !params.has(k));
    if (faltantes.length)
      throw new Error(`Faltan parámetros: ${faltantes.join(", ")}`);

    const region = params.get("region");
    if (!/^[a-z]{2}-[a-z]+-\d$/.test(region)) {
      throw new Error("La 'region' de AWS debe parecerse a 'us-east-1'");
    }
  }

  async aprovisionar(params) {
    this.validar(params);
    // Aquí iría el SDK de AWS, nosotros simulamos:
    const id = `aws-${Date.now()}`;
    return new VM(id, "running", this.proveedor());
  }
}

module.exports = { ProvisionadorAWS };
