import User from "../models/user.js";
import pool from "../database/db.js";

// Get user points and render 'users/profile' view
export const getUserProfile = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;

    res.render("users/profile", {
        styles: "profile",
        message,
        user: req.user,
        points: req.user.points,
        noUserImgSidebar: true,
        noProfileLink: true,
    });
};

// Compare user password, check if the new username if exists, Change Username and redirect to profile page
export const changeUsername = async (req, res) => {
    const { password, newUsername, username } = req.body;
    const user = new User(username);
    let comparedPassword;
    let comparedUsername;
    try {
        comparedPassword = await user.comparePassword(password);
        comparedUsername = await user.compareUsername(newUsername);
    } catch (error) {
        console.error(error);
        return res.redirec("/error");
    }

    if (comparedPassword) {
        if (comparedUsername) {
            try {
                await user.updateUsername(newUsername);
            } catch (error) {
                console.error(error);
                return res.redirect("/error");
            }

            req.session.message = "Nombre de Usuario Cambiado";
            res.redirect("/profile");
        } else {
            req.session.message = "Este nombre de usuario ya existe";
            res.redirect("/profile/change-username");
        }
    } else {
        req.session.message = "Contraseña Incorrecta";
        res.redirect("/profile/change-username");
    }
};

// Compare user password, change password and redirect to profile page
export const changePassword = async (req, res) => {
    const { password, newPassword, username } = req.body;
    const user = new User(username);
    let comparedPassword;
    try {
        comparedPassword = await user.comparePassword(password);
    } catch (error) {
        console.error(error);
        return res.redirect("/error");
    }
    if (comparedPassword) {
        user.password = newPassword;
        user.encryptPassword();
        try {
            await user.updatePassword();
        } catch (error) {
            console.error(error);
            return res.redirect("/error");
        }

        req.session.message = "Contraseña Cambiada";
        res.redirect("/profile");
    } else {
        req.session.message = "Contraseña Incorrecta";
        res.redirect("/profile/change-password");
    }
};

// Compare user password, delete user in db and redirect to main page
export const deleteAccount = async (req, res) => {
    const { username, password } = req.body;
    const user = new User(username);
    let comparedPassword;

    try {
        comparedPassword = await user.comparePassword(password);
    } catch (error) {
        console.error(error);
        return res.redirect("/error");
    }

    if (comparedPassword) {
        req.logout(async (err) => {
            if (err) {
                console.log(err);
            }
            try {
                await user.delete();
            } catch (error) {
                console.error(error);
                return res.redirect("/error");
            }
            req.session.message = "Cuenta Eliminada";
            res.redirect("/");
        });
    } else {
        req.session.message = "Contraseña Incorrecta";
        res.redirect("/profile/delete-account");
    }
};

// Change user img and redirect to profile page
export const changeUserImg = async (req, res) => {
    const { username } = req.user;
    const { filename } = req.file;
    const user = new User(username);

    try {
        await user.setImg(filename);
    } catch (error) {
        console.error(error);
        return res.redirect("/error");
    }

    res.redirect("/profile");
};

// Get users and order it by their points and render 'users/scoreTable' view
export const getScoreTable = async (req, res) => {
    let users;
    try {
        users = await pool.query(
            "SELECT username,points,user_img FROM users ORDER BY points DESC"
        );
    } catch (error) {
        console.error(error)
        return res.redirect("/error")
    }

    // Add 'pos' property to the users obtained and the user logged
    users.rows.forEach((user, ind, users) => {
        users[ind].pos = ind + 1;
        if (user.username == req.user.username) {
            req.user.pos = ind + 1;
        }
    });

    const message = req.session.message;
    delete req.session.message;

    res.render("users/scoreTable", {
        message,
        styles: "scoretable",
        user: req.user,
        users: users.rows,
        noUserImgSidebar: true,
    });
};
