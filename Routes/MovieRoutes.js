import express from "express";
const router = express.Router();

/* Imports from another files */
import {
createMovie,
getAllMovies
} from "../Controllers/movieController.js";

router.route("/").post(createMovie).get(getAllMovies);

export default router;

// It takes all the requests and routes accourding to it
