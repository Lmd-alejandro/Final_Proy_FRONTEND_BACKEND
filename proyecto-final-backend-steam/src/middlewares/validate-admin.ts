import { Request, Response, NextFunction } from 'express';

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body.decoded;

    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado. El usuario no es administrador' });
    }
};

export default validateAdmin;
