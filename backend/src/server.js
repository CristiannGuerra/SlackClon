import ENVIRONMENT from "./config/enviroment.config.js";
import express from "express";
import authRouter from "./routes/auth.router.js";
import mongoose from "./config/mongoDB.config.js";
import cors from "cors"
import { authMiddleware } from "./middlewares/authMiddleware.js";
import workspace_router from "./routes/workspace.router.js";

// Create server
const app = express()

// Middlewares
// Use CORS
app.use(cors())

// app.use(cors(
//     {
//         origin: ENVIRONMENT.URL_FRONTEND,}
// ))

// Use JSON
app.use(express.json())

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server running on port http://localhost:${ENVIRONMENT.PORT}`)
})

// Routers
app.use("/api/auth", authRouter)
app.use("/api/workspace", workspace_router)