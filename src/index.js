import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
console.clear()

// Settings
app.set("port", 3000)
app.set("views", join(__dirname,"views"))
app.set("view engine", "hbs")
app.engine("hbs", engine({
    layoutsDir: join(app.get("views"),"layouts"),
    defaultLayout: "main",
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs"
}))


// Middlewares
app.use(morgan("dev"))



// Routes



app.listen(app.get("port"))
console.log(`Server on port ${app.get("port")}`)
