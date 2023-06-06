import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.js";

const localStrategy = Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = new User();
    done(null, await user.getById(id));
});

passport.use(
    "local-signin",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const user = new User(username, password);
            if (await user.usernameExits()) {
                req.session.message = "Este nombre de usuario ya existe"
                return done(null,false)
            } else {
                user.encryptPassword();
                await user.save();
                done(null, user);
            }
        }
    )
);

passport.use("local-signup", new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req,username, password, done) => {

    const user = new User()

    if (!await user.compareUsername(username)) {
        req.session.message = "Usuario o Contraseña incorrectos"
        return done(null,false)
    }
    await user.setUserFromDB(username)
    if (!await user.comparePassword(password)) {
        req.session.message = "Usuario o Contraseña incorrectos"
        return done(null,false)
    }
    done(null,user)
}))

export default passport;
