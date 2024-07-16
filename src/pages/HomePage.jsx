import { useEffect, useState } from "react";
import { getMovies } from "../apiService/movie";
import MovieList from "../components/MovieList/MovieList";
import ErrorMessage from "../components/ErrorMesage/ErrorMessage";
import Loader from "../components/Loader/Loader";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = "trending/movie/day";
  const query = "?language=en-US";

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const { results } = await getMovies(url, query);
        setTrendingMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={"Sorry! Something get wrong!"} />}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}
