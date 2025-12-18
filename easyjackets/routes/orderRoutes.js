import express from 'express'
import { getOrder, getOrderlist, updateOrder } from '../controllers/orderController.js'
import { createBulkOrder, getAllbulkOrderController, getSingleOrderController } from '../controllers/bulkOrderController.js'

const router = express.Router()


router.post('/bulk' , createBulkOrder)
router.get('/bulk' , getAllbulkOrderController)
router.get('/bulk/:id' , getSingleOrderController)
router.get('/:id' , getOrder)
router.put('/:id' , updateOrder)
router.get('/' ,getOrderlist)

export default router