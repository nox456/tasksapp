import { Router } from 'express'
import { addHabit, deleteHabit, getHabits, getHabitsData, getHabitsDetails, updateHabits } from '../controllers/habitsControllers.js'

const router = Router()

router.get("/habits/list", getHabits)

router.get("/habits/add", (req,res) => res.render("habits/addHabit", { styles: "habits" }))

router.post("/habitsAdd", addHabit)

router.get("/habitsDelete", deleteHabit)

router.get("/habits/update", getHabitsData)

router.get("/habitsUpdate", updateHabits)

router.get("/habits/detail", getHabitsDetails)

export default router
