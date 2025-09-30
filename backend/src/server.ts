import app, { initApp } from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
initApp().then(() => {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}).catch(err => {
  console.error("Failed to init app", err);
});
