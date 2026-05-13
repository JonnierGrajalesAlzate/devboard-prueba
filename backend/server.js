import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import pool from "./bd/connection.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(() => {
        console.log("Conectado a PostgreSQL");
    })
    .catch((error) => {
        console.error(error.message);
    });

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});