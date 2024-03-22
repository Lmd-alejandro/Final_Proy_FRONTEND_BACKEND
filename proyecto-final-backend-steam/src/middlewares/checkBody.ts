import { Request, Response, NextFunction } from 'express';
import Cliente from '../models/cliente.model';
import Producto from '../models/producto.model';

export const validarRegistro = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, email, direccion, password,role } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    }

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    if (!direccion) {
        return res.status(400).json({ message: 'La direccion es obligatoria' });
    }

    if (!password) {
        return res.status(400).json({ message: 'La contraseña es obligatoria' });
    }

    if(!role || (role !== "admin" && role !== "user")) {
        return res.status(400).json({ message: 'El role es obligatorio o se ha proporcionado un role invalido' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico proporcionado no es válido' });
    }

    next();
};

export const verificarCamposCrearProducto = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || !precio) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (typeof precio !== 'number' || isNaN(precio) || precio <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número positivo' });
    }

    next();
};

export const verificarCamposActualizarProducto = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre && !descripcion && !precio) {
        return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar el producto' });
    }

    next();
};

export const verificarCamposActualizarPedido = async (req: Request, res: Response, next: NextFunction) => {
    const { clienteId, productoId, total, fechaPedido } = req.body;

    if (!clienteId && !productoId && !total && !fechaPedido) {
        return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar el pedido' });
    }

    if(clienteId){
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
    }

    if(productoId){
        const producto = await Producto.findByPk(productoId)
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    }

    next();
}

export const verificarCamposCrearPedido = async (req: Request, res: Response, next: NextFunction) => {
    const { clienteId, productoId, total, fechaPedido } = req.body;

    if(!clienteId || !productoId || !total || !fechaPedido) {
        return res.status(400).json({ message: 'Se debe proporcionar todos los campos' });
    }

    next()
}
