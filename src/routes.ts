import { Router } from 'express'

import carController from './controller/car'


const router = Router()

router.use('/car', carController)

export default router
