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
        noUserImgSidebar: true
    });
};

// Compare user password, check if the new username if exists, Change Username and redirect to profile page
export const changeUsername = async (req, res) => {
    const { password, newUsername, username } = req.body;
    const user = new User(username);

    if (await user.comparePassword(password)) {
        if (await user.compareUsername(newUsername)) {
            await user.updateUsername(newUsername);

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

    if (await user.comparePassword(password)) {
        user.password = newPassword;
        user.encryptPassword();
        await user.updatePassword();

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

    if (await user.comparePassword(password)) {
        req.logout((err) => {
            if (err) {
                console.log(err);
            }
            req.session.message = "Cuenta Eliminada";
            res.redirect("/");
        });
        await user.delete();
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

    await user.setImg(filename);

    res.redirect("/profile");
};

// Get users and order it by their points and render 'users/scoreTable' view
export const getScoreTable = async (req,res) => {
    const users = await pool.query("SELECT username,points,user_img FROM users ORDER BY points DESC")

    // Add 'pos' property to the users obtained and the user logged
    users.rows.forEach((user,ind,users) => {
        users[ind].pos = ind + 1
        if (user.username == req.user.username) {
            req.user.pos = ind + 1 
        }
    })

    const message = req.session.message
    delete req.session.message

    res.render("users/scoreTable", {
        message,
        styles: "scoretable",
        user: req.user,
        users: users.rows
    })
}
