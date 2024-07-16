import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { getMoviesDetails } from "../../apiService/movie";
import { FaArrowCircleLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMesage/ErrorMessage";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
import clsx from "clsx";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
function getImageUrl(path) {
  return path ? `${BASE_IMAGE_URL}${path}` : defaultImg;
}

const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state ?? "/movies";

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    async function fetchData() {
      try {
        const movieData = await getMoviesDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={"Sorry! Something get wrong!"} />}
      <Link className={css.btn} to={backLink}>
        <FaArrowCircleLeft className={css.icon} />
        Go back
      </Link>
      {movie && (
        <div className={css.container}>
          <img
            className={css.img}
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            width={250}
          />
          <div className={css.wrap}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.text}>User Score: {movie.vote_average}%</p>
            <h3 className={css.title}>Overview</h3>
            <p className={css.text}>{movie.overview}</p>
            <h3 className={css.title}>Genres</h3>
            <ul className={css.list}>
              {movie.genres?.map((genre) => {
                return (
                  <li key={genre.id}>
                    <p className={css.text}>{genre.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className={css.title}>Additional information</h3>
            <ul>
              <li>
                <NavLink to="cast" className={makeNavLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={makeNavLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
