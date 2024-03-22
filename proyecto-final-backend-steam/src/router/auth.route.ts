import { Router } from "express";
import { AuthController } from "../controller";
import {validarRegistro} from "../middlewares/checkBody";

const router = Router()

const {
    inicioSesion,
    registroUsuario
} = AuthController


router.post('/sign-in', inicioSesion)
router.post('/sign-up', validarRegistro, registroUsuario)

export default router