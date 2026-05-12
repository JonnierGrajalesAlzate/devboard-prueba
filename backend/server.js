import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./bd/connection.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL");
  })
  .catch((error) => {
    console.error("error en la base de datos:", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "API corriendo",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});