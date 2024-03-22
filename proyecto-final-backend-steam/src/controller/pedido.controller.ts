import { Request, Response } from 'express';
import { sequelize } from '../db';
import Pedido from '../models/pedido.model';
import Cliente from '../models/cliente.model';
import Producto from '../models/producto.model';

const obtenerPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
};

const obtenerPedidoPorId = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pedido' });
    }
};

const crearPedido = async (req: Request, res: Response) => {
    const { clienteId, productoId, total, fechaPedido } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const cliente = await Cliente.findByPk(clienteId, { transaction: transaction });
        const producto = await Producto.findByPk(productoId, { transaction: transaction })
        if (!cliente) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        if (!producto) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const pedido = await Pedido.create({ clienteId, productoId, total, fechaPedido }, { transaction: transaction });

        await transaction.commit();
        res.status(201).json(pedido);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
};

const actualizarPedido = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    const { clienteId, productoId, total, fechaPedido } = req.body;
    const transaction = await sequelize.transaction(); // Iniciar transacción

    try {
        // Verificar si el pedido existe
        const pedido = await Pedido.findByPk(id, { transaction: transaction });
        if (!pedido) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        // Actualizar el pedido
        await pedido.update({ clienteId, productoId, total, fechaPedido }, { transaction: transaction });

        // Confirmar la transacción si todo está bien
        await transaction.commit();
        res.json(pedido);
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        res.status(500).json({ message: 'Error al actualizar el pedido' });
    }
};

// Eliminar un pedido con transacción
const eliminarPedido = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);

    try {
        // Verificar si el pedido existe
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        // Eliminar el pedido
        await pedido.destroy();

        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }
};

export default {
    obtenerPedidos,
    obtenerPedidoPorId,
    crearPedido,
    actualizarPedido,
    eliminarPedido
}