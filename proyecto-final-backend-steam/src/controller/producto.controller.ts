import { Request, Response } from 'express';
import { sequelize } from '../db';
import Producto from '../models/producto.model';

const crearProducto = async (req: Request, res: Response) => {
    const { nombre, descripcion, precio } = req.body;
    const transaction = await sequelize.transaction(); 

    try {
        const producto = await Producto.create({ nombre, descripcion, precio }, { transaction: transaction });
        await transaction.commit(); 
        res.status(201).json(producto);
    } catch (error) {
        await transaction.rollback(); 
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

const actualizarProducto = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string)
    const { nombre, descripcion, precio } = req.body;
    const transaction = await sequelize.transaction(); 

    try {
        const producto = await Producto.findByPk(id, { transaction: transaction });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.update({ nombre, descripcion, precio }, { transaction: transaction });
        await transaction.commit(); 
        res.json(producto);
    } catch (error) {
        await transaction.rollback(); 
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

const obtenerProductoPorId = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string)
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

const eliminarProducto = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string)
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.destroy(); 
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

export default {
    crearProducto,
    actualizarProducto,
    obtenerProductoPorId,
    obtenerProductos,
    eliminarProducto
}
