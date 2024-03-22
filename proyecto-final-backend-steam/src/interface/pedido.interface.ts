import { Optional } from "sequelize";

export interface PedidoInterface {
    id: number;
    clienteId: number;
    total: number;
    productoId: number;
    fechaPedido: Date;
  }
  
  export interface PedidoCreationInterface extends Optional<PedidoInterface, 'id'> {}
  