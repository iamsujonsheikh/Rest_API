import app from "./app.js";
import connectDB from "./config/db.js";
import { port } from "./secret/secret.js";


app.listen(port, () => {
    console.log(`Server is running on ${port}`.bgWhite.black);
    connectDB();
});