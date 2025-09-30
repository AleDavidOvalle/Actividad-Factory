// Contenedor sencillo de parámetros (clave-valor)
class ParametrosVM {
  constructor(valores = {}) {
    this.valores = { ...valores };
  }
  get(clave) {
    return this.valores[clave];
  }
  has(clave) {
    return Object.prototype.hasOwnProperty.call(this.valores, clave);
  }
}
module.exports = { ParametrosVM };
