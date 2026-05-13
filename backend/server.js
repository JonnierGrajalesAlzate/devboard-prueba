import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./bd/connection.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch((error) => {
        console.error(error.message);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});