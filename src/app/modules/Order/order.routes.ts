import express from 'express'
import { OrderControllers } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constance';
const router = express.Router()

router.post("/confirmation", auth(USER_ROLE.user), OrderControllers.createOrder)
export const OrderRoutes = router;
