import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

/**Imports functions from another files */
import movieRoutes from './Routes/MovieRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import { autherization } from "./middleware/autherization.js";

/**Middlewares */
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/movies", autherization, movieRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to TruAD server</h1>");
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

/* starter function to start the server only when mongodb connected */
const start = async () => {
  try {
    // mongoose connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DataBase");
    app.listen(PORT, () => console.log(`Server is lisening on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
