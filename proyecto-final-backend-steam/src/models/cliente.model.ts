// clienteModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { ClienteCreationInterface, ClienteInterface } from '../interface/cliente.interface';
import Pedido from './pedido.model';

class Cliente extends Model<ClienteInterface, ClienteCreationInterface> implements ClienteInterface {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public direccion!: string;
    public password!: string;
    public role!: string;

    public static associate(models: any) {
        Cliente.hasMany(models.Pedido, { foreignKey: 'clienteId' });
    }
}

Cliente.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'cliente',
        timestamps: false
    }
);

Cliente.associate = (models: any) => {
    Cliente.hasMany(models.pedido, { foreignKey: 'clienteId' });
}


export default Cliente;
