import { Router } from "express";
import { PedidoController, ProductController } from "../controller";
import validateAdmin from "../middlewares/validate-admin";
import validateToken from "../middlewares/validate-jwt";
import {verificarCamposCrearPedido, verificarCamposActualizarPedido} from '../middlewares/checkBody'

const router = Router()

const {
    eliminarPedido,
    obtenerPedidoPorId,
    obtenerPedidos,
    crearPedido,
    actualizarPedido
} = PedidoController


router.post('/create-pedido',[validateToken, verificarCamposCrearPedido] , crearPedido)
router.patch('/update-pedido', [validateToken, verificarCamposActualizarPedido], actualizarPedido)
router.delete('/delete-pedido', [validateToken], eliminarPedido)
router.get('/get-all-pedidos', [validateToken], obtenerPedidos)
router.get('/get-pedido', [validateToken], obtenerPedidoPorId)

export default router