import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../apiService/movie";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMesage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const url = "search/movie";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    setIsLoading(true);
    async function fetchData() {
      try {
        const { results } = await getMovies(url, `?query=${query}`);
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };
  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={"Sorry! Something get wrong!"} />}
      <MovieList movies={movies} />
    </div>
  );
}
