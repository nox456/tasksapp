import { Router } from 'express'
import { addHabit, deleteHabit, getHabits } from '../controllers/habitsControllers.js'

const router = Router()

router.get("/habits/list", getHabits)

router.get("/habits/add", (req,res) => res.render("habits/addHabit", { styles: "habits" }))

router.post("/habitsAdd", addHabit)

router.get("/habitsDelete", deleteHabit)

export default router
