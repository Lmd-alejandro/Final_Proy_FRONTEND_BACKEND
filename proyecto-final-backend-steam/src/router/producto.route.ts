import { Router } from "express";
import { ProductController } from "../controller";
import validateAdmin from "../middlewares/validate-admin";
import validateToken from "../middlewares/validate-jwt";
import {verificarCamposCrearProducto, verificarCamposActualizarProducto} from '../middlewares/checkBody'

const router = Router()

const {
    eliminarProducto,
    crearProducto,
    actualizarProducto,
    obtenerProductoPorId,
    obtenerProductos
} = ProductController


router.post('/create-product',[validateToken, validateAdmin, verificarCamposCrearProducto] , crearProducto)
router.patch('/update-product', [validateToken, validateAdmin, verificarCamposActualizarProducto], actualizarProducto)
router.delete('/delete-product', [validateToken, validateAdmin], eliminarProducto)
router.get('/get-all-products', [validateToken], obtenerProductos)
router.get('/get-product', [validateToken], obtenerProductoPorId)

export default router