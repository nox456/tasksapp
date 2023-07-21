import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    const { username } = req.user;
    const points = await new User(username).getPoints();

    res.render("users/profile", {
        styles: "profile",
        message,
        user: req.user,
        points,
    });
};

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

export const changeUserImg = async (req, res) => {
    const { username } = req.user;
    const { filename } = req.file;
    const user = new User(username);

    await user.setImg(filename);

    res.redirect("/profile");
};
