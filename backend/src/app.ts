import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import routes from "./routes";
import {requestLogger} from "./middlewares/logger";
import {sequelize} from "./config/db";
import logger from "./utils/logger";
import {startReminders} from "./cron/reminders";

const app = express();

app.use(cors({
    origin: (origin, callback) =>
        !origin || origin === process.env.FRONTEND_URL ? callback(null, true) :
            callback(new Error("Not allowed by CORS"))
}));
app.use(express.json());
app.use(requestLogger);
app.use("/api", routes);
app.get("/", (req, res) => res.send("Library API running"));

export async function initApp() {
    try {
        await sequelize.authenticate();
        logger.info("Sequelize connected");
        await sequelize.sync();//{alter: true}
        startReminders();
    } catch (err) {
        logger.error("DB connection error: " + err);
        throw err;
    }
}

export default app;