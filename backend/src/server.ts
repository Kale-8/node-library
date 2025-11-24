import app, {initApp} from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

initApp().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to init app", err);
});