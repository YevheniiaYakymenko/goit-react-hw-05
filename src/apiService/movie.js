import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTk1NjBkZTMwZGRlNzA2MzFhYTE4ZGUxNDVhYjQxNiIsIm5iZiI6MTcyMTA2NzIyMS41NTEyMDksInN1YiI6IjY2OTU2NTI3NzAwYzU2ZjkxNWJmZjU3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QTbI-9MzGHUOzbZe91kkoIaQz3mCZ42SGZGwEJJomvE";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["accept"] = "application/json";

export const getMovies = async (url, query) => {
  const response = await axios.get(url + query);
  return response.data;
};

export const getMoviesDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`);
  return response.data;
};
