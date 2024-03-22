// pedidoModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { PedidoInterface, PedidoCreationInterface } from '../interface/pedido.interface';
import Cliente from './cliente.model';
import Producto from './producto.model';

class Pedido extends Model<PedidoInterface, PedidoCreationInterface> implements PedidoInterface {
    public id!: number;
    public clienteId!: number;
    public total!: number;
    public productoId!: number;
    public fechaPedido!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any) {
        Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });
        Pedido.hasMany(Producto, { foreignKey: 'pedidoId' });
    }
}

Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cliente',
                key: 'id',
            },
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Producto',
                key: 'id'
            }
        },

        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fechaPedido: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'pedido',
        timestamps: false

    }
);

Pedido.associate = (models: any) => {
    Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });
    Pedido.hasMany(Producto, { foreignKey: 'pedidoId' });
}

export default Pedido;
