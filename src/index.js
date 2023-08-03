import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import indexRoutes from "./routes/indexRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import habitsRoutes from "./routes/habitsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import passport from "passport";
import dotenv from "dotenv";
import multer from "multer";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.clear();

// Settings
app.set("port", process.env.PORT);
app.set("host", process.env.HOST);
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
    "hbs",
    engine({
        layoutsDir: join(app.get("views"), "layouts"),
        defaultLayout: "main",
        partialsDir: join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: {
            compare: (val1, val2) => val1 == val2,
            checkDays: (habitDays, day) => habitDays.includes(day),
        },
    })
);
dotenv.config({
    path: join(__dirname, "..", ".env"),
    override: true,
});

// Middlewares
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "static")));
app.use(express.static(join(__dirname, "public/uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_KEY,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
    multer({
        storage: multer.diskStorage({
            destination: join(__dirname, "public/uploads"),
            filename: (req, file, cb) => {
                const user_id = req.user.id;
                cb(null, user_id + extname(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            const types = [".jpg", ".jpeg", ".png"];
            const ext = extname(file.originalname);
            cb(null, types.includes(ext));
        },
    }).single("user_img")
);

// Routes
app.use(indexRoutes);
// Check if is Logged
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/logout");
    }
});
app.use(userRoutes);
app.use(tasksRoutes);
app.use(habitsRoutes);

app.listen(app.get("port"), app.get("host"));
console.log(`Server on http://${app.get("host")}:${app.get("port")}`);
