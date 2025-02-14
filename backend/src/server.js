import ENVIRONMENT from "./config/enviroment.config.js";
import express from "express";
import authRouter from "./routes/auth.router.js";
import mongoose from "./config/mongoDB.config.js";

const app = express()

app.use(express.json())

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server running on port http://localhost:${ENVIRONMENT.PORT}`)
})

app.use("/api/auth", authRouter)