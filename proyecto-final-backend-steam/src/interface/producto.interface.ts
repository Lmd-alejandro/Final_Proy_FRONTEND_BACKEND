import { Optional } from "sequelize";

export interface ProductoInterface {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

export interface ProductoCreationInterface extends Optional
    <ProductoInterface, 'id'> { }
