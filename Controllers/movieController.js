import { StatusCodes } from "http-status-codes";

/* Imports from another files */
import {Movie} from '../Model/movieModel.js'
import NotFoundError from "../errors/not-found.js";

// desc: creating a movie         route: /api/movie
export const createMovie = async (req, res) => {
  const hotel = await Movie.create(req.body);
  res.status(StatusCodes.CREATED).json("Movie is added");
};


// desc: getting all  movies            route: /api/movie
export const getAllMovies = async (req, res) => {
  const movies = await Movie.find({ user: req.user.id }).sort("createdAt");
  if (!movies || movies.length === 0)
    throw new NotFoundError(`No Movies`);
  res.status(StatusCodes.OK).json(movies);
};

