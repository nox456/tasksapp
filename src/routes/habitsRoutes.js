import { Router } from 'express'
import { getHabits } from '../controllers/habitsControllers.js'

const router = Router()

router.get("/habits/list", getHabits)

export default router
