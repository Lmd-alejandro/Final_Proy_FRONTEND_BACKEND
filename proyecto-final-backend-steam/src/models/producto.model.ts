import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { ProductoInterface, ProductoCreationInterface } from '../interface/producto.interface';
import Pedido from './pedido.model'; // Importa el modelo Pedido

class Producto extends Model<ProductoInterface, ProductoCreationInterface> implements ProductoInterface {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
    public precio!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate(models: any) {
        Producto.hasMany(models.Pedido, {  foreignKey: 'productoId' });
    }
}

Producto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'producto',
        timestamps: false
    }
);

Producto.associate = (models: any) => {
    Producto.hasMany(models.Pedido, { foreignKey: 'productoId' });
}

export default Producto;
