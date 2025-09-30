// Entidad simple de dominio
class VM {
  constructor(id, estado, proveedor) {
    this.id = id;
    this.estado = estado;
    this.proveedor = proveedor;
  }
}
module.exports = { VM };
