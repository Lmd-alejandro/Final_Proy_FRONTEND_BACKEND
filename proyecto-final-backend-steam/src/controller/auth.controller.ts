import { Request, Response } from 'express';
import Cliente from '../models/cliente.model';
import { hashPassword, comparePasswords } from '../helper/bcryptPass';
import jwt from 'jsonwebtoken';
import config from '../config';

const { keyToken } = config;

const registroUsuario = async (req: Request, res: Response) => {
    const { nombre, email, direccion, password, role } = req.body;

    try {
        let cliente = await Cliente.findOne({ where: { email } });
        if (cliente) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await hashPassword(password);

        cliente = await Cliente.create({ nombre, email, direccion, role, password: hashedPassword });

        const token = jwt.sign({ id: cliente.id, nombre: cliente.nombre, email: cliente.email, role: cliente.role }, keyToken, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: `Error al registrar el usuario, ${error}` });
    }
};

const inicioSesion = async (req: Request, res: Response) => {
    const { email, password, } = req.body;

    try {
        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const match = await comparePasswords(password, cliente.password);
        if (!match) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: cliente.id, nombre: cliente.nombre, email: cliente.email, role: cliente.role }, keyToken, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión, '+ error });
    }
};

export default {
    inicioSesion,
    registroUsuario
}
