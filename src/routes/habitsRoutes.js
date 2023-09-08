import { Router } from "express";
import {
    addHabit,
    deleteHabit,
    getHabits,
    getHabitsData,
    getHabitsDetails,
    searchHabits,
    updateHabits,
} from "../controllers/habitsControllers.js";

const router = Router();

// Route to habits list page
router.get("/habits/list", getHabits);

// Route to add habit page
router.get("/habits/add", (req, res) => {
    const message = req.session.message
    delete req.session.message
    res.render("habits/addHabit", {
        message,
        styles: "habits",
        styles2: "inputs",
        user: req.user ? req.user : undefined,
    });
});

// Route to add a habit
router.post("/habitsAdd", addHabit);

// Route to delete a habit
router.get("/habitsDelete", deleteHabit);

// Route to update habit page
router.get("/habits/update", getHabitsData);

// Route to update a habit
router.get("/habitsUpdate", updateHabits);

// Route to habit details page
router.get("/habits/detail", getHabitsDetails);

// Route to search habit results
router.get("/searchHabits", searchHabits);
export default router;
