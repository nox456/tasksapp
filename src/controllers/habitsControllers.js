import Habit from "../models/habit.js";

// Get all habits and render 'habitsList' View
export const getHabits = async (req, res) => {
    const orderText = req.query.order;
    const user_id = req.user.id;
    let data;
    try {
        data = await Habit.getAll(orderText || "title ASC", user_id);
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }

    const message = req.session.message;
    delete req.session.message;
    res.render("habits/habitsList", {
        styles: "habits",
        styles2: "search",
        styles3: "inputs",
        habits: data.rows,
        message,
        orderText,
        user: req.user ? req.user : undefined,
        searchHabits: true,
    });
};

// Create a habit, save in db and redirect to habits list page
export const addHabit = async (req, res) => {
    const { title, description, days, time_to_do, category } = req.body;
    try {
        await Habit.validate(title, description, days, time_to_do, category)
    } catch (error) {
        req.session.message = error.errors[0].message
        return res.redirect("/habits/add")
    }
    const user_id = req.user.id;
    try {
        await Habit.save(
            title,
            description,
            days,
            time_to_do,
            category,
            user_id
        );
        req.session.message = "Habito Creado con Éxito";
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }
    res.redirect("/habits/list");
};

// Delete a habit from db and redirect to habits list page
export const deleteHabit = async (req, res) => {
    const { id } = req.query;

    try {
        await Habit.delete(id);
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }

    req.session.message = "Habito Eliminado con Éxito";

    res.redirect("/habits/list");
};

// Get a habit by it ID field and render 'updateHabits' view to update it
export const getHabitsData = async (req, res) => {
    const { id } = req.query;
    let data;
    try {
        data = await Habit.getById(id);
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }
    const message = req.session.message
    delete req.session.message

    res.render("habits/updateHabits", {
        habit: data.rows[0],
        styles: "habits",
        styles2: "inputs",
        user: req.user ? req.user : undefined,
        message
    });
};

// Update a Habit in db and redirect to habit list page
export const updateHabits = async (req, res) => {
    const { id, title, description, days, time_to_do, category } = req.query;
    try {
        await Habit.validate(title, description, days, time_to_do, category)
    } catch (error) {
        req.session.message = error.errors[0].message
        return res.redirect(`/habits/update?id=${id}`)
    }
    try {
        await Habit.update(id, title, description, days, time_to_do, category)
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }

    req.session.message = "Habito Modificado con Éxito";

    res.redirect("/habits/list");
};

// Get a habit by it ID field and render 'detailsHabits' to show it data
export const getHabitsDetails = async (req, res) => {
    const { id } = req.query;

    let data;
    try {
        data = await Habit.getById(id);
    } catch (error) {
        console.error(error)
        return res.redirect("/error");
    }

    res.render("habits/detailsHabits", {
        styles: "habits",
        habit: data.rows[0],
        user: req.user ? req.user : undefined,
    });
};

export const searchHabits = async (req, res) => {
    const { search_query } = req.query;
    let habitsFounded;
    try {
        habitsFounded = await Habit.search(
            search_query.trim().toLowerCase(),
            req.user.id
        );
    } catch (error) {
        console.error(error)
        return res.redirect("/error")
    }

    const message = req.session.message;
    delete req.session.message;

    res.render("habits/searchHabits", {
        message,
        user: req.user,
        styles: "search",
        habitsFounded,
    });
};
