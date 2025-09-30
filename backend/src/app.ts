import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import { requestLogger } from "./middlewares/logger";
import { sequelize } from "./config/db";
import logger from "./utils/logger";
import { startReminders } from "./cron/reminders";
const app = express();
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: FRONTEND }));
app.use(express.json());
app.use(requestLogger);
app.use("/api", routes);
app.get("/", (req,res)=> res.send("Library API running"));
export async function initApp(){
  try{
    await sequelize.authenticate();
    logger.info("Sequelize connected");
    await sequelize.sync({ alter: true });
    startReminders();
  }catch(e){
    logger.error("DB connection error: " + e);
    throw e;
  }
}
export default app;
