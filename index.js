import express from "express";
import { connectDB } from "./src/helper/connectDB.js";
import { ENV } from "./src/constant/index.js"
import routers from "./src/routes/index.js";
import { config } from "dotenv";
config()
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routers);
app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "healthMate project working properly",
    })
})

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is connceted on the port of ${PORT}`)
})
export default app;